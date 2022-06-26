import type { JsonObject } from 'type-fest'
import type { PushMessages } from '../services/line-fetch'
import type { ScriptProperties } from '../domains/script-properties'
import type { UserSheetRepository } from '../domains/user'
import type { WordsEachUsersSheetRepository } from '../domains/words-each-users'
import { TobWordRegexp as _TobWordRegexp } from '../domains/regexp'
import type { WordsMatchedMessage } from '../services/words-matched-message'
import type { Fetch } from '../domains/fetch'
import type { LineMessage } from '../services/line-message'
import type { Drive } from '../domains/drive'
import type { Document } from '../domains/document'

const TobWordRegexp: typeof _TobWordRegexp =
    typeof _TobWordRegexp === 'undefined'
        ? exports.TobWordRegexp
        : _TobWordRegexp

export function examineFlyersByWords({
    userSheetRepository,
    wordsEachUsersSheetRepository,
    fetch,
    document,
    drive,
    pushMessages,
    scriptProperties,
    lineMessage,
    wordsMatchedMessage
}: {
    userSheetRepository: UserSheetRepository
    wordsEachUsersSheetRepository: WordsEachUsersSheetRepository
    scriptProperties: ScriptProperties

    fetch: Fetch<GoogleAppsScript.URL_Fetch.HTTPResponse>
    document: Document
    drive: Drive<GoogleAppsScript.Base.Blob>
    pushMessages: PushMessages
    lineMessage: LineMessage
    wordsMatchedMessage: WordsMatchedMessage
}): void {
    const userIds = userSheetRepository.getAll()
    const lineToken = scriptProperties.getLineToken().get()
    const tirashiUrls = scriptProperties.getTirashiUrl().get()
    const parentId = scriptProperties.getFolderIdWhereFlyerDownloads()

    function convertImageIntoText(
        imageBlob: GoogleAppsScript.Base.Blob,
        mimeType: string
    ): string {
        const file = drive.insertFile(imageBlob, mimeType, parentId)
        const text = document.getText(file.id)

        file.delete()

        return text
    }

    function sendMessageAbout404(userId: string): void {
        const data = lineMessage.createError(
            'URL 先にチラシがありません。変数を再設定してください。'
        )
        data.to = userId
        pushMessages(JSON.stringify(data), lineToken)
    }

    function sendMessageAbout500Series(userId: string): void {
        const data = lineMessage.createWarning(
            'URL 先が原因でチラシの取得に失敗しました。このエラーが数日続くようであれば変数を見直してください。'
        )
        data.to = userId
        pushMessages(JSON.stringify(data), lineToken)
    }

    userIds.forEach((userId, index) => {
        // Separated by using comma
        const concatenatedString = wordsEachUsersSheetRepository.get(index)
        const wordValues = concatenatedString.split(',')
        const wordRegexps = wordValues.map((r) => new TobWordRegexp(r))

        const messages = tirashiUrls
            .map((url) => {
                const fetchedResponse = fetch(url, { method: 'get' }, true)
                const fetchedResponseCode = fetchedResponse.getResponseCode()
                if (fetchedResponseCode >= 500) {
                    return sendMessageAbout500Series(userId)
                } else if (fetchedResponseCode >= 404) {
                    return sendMessageAbout404(userId)
                }

                const imageBlob = fetchedResponse.getBlob()
                const mimeType = (
                    fetchedResponse.getHeaders() as { 'Content-Type': string }
                )['Content-Type']
                const text = convertImageIntoText(imageBlob, mimeType)
                const matchedWordRegexps = wordRegexps.filter((wordRegexp) => {
                    return wordRegexp.test(text)
                })

                if (matchedWordRegexps.length > 0) {
                    return wordsMatchedMessage.create({
                        title: '掲載情報と言葉が一致しました！',
                        imageUrl: url,
                        matchedWords: matchedWordRegexps.map(
                            (regexp) => regexp.registered
                        )
                    }).messages
                }

                return undefined
            })
            .filter((v): v is JsonObject => Boolean(v))

        const data = {
            to: userId,
            messages: messages.flat()
        }
        pushMessages(JSON.stringify(data), lineToken)
    })
}
