import type { PushMessages } from '../services/line-fetch'
import type { ScriptProperties } from '../domains/script-properties'
import type { UserSheetRepository } from '../domains/user'
import type { WordsEachUsersSheetRepository } from '../domains/words-each-users'
import { TobWordRegexp as _TobWordRegexp } from '../domains/regexp'
import type { WordsMatchedMessage } from '../services/words-matched-message'
import type { Fetch } from '../domains/fetch'
import type { LineMessage } from '../services/line-message'

const TobWordRegexp: typeof _TobWordRegexp =
    typeof _TobWordRegexp === 'undefined'
        ? exports.TobWordRegexp
        : _TobWordRegexp

export function examineFlyersByWords({
    userSheetRepository,
    wordsEachUsersSheetRepository,
    fetch,
    pushMessages,
    scriptProperties,
    lineMessage,
    wordsMatchedMessage
}: {
    userSheetRepository: UserSheetRepository
    wordsEachUsersSheetRepository: WordsEachUsersSheetRepository
    scriptProperties: ScriptProperties

    fetch: Fetch<GoogleAppsScript.URL_Fetch.HTTPResponse>
    pushMessages: PushMessages
    lineMessage: LineMessage
    wordsMatchedMessage: WordsMatchedMessage
}): void {
    const userIds = userSheetRepository.getAll()
    const tirashiUrls = scriptProperties.getTirashiUrl().get()

    userIds.forEach((userId, index) => {
        const lineToken = scriptProperties.getLineToken().get()
        // Separated by using comma
        const concatenatedString = wordsEachUsersSheetRepository.get(index)
        const wordValues = concatenatedString.split(',')
        const wordRegexps = wordValues.map((r) => new TobWordRegexp(r))

        tirashiUrls.forEach((url) => {
            const fetchingBlobResponse = fetch(url, { method: 'get' }, true)
            const fetchingBlobResponseCode =
                fetchingBlobResponse.getResponseCode()
            if (fetchingBlobResponseCode >= 500) {
                const data = lineMessage.createWarning(
                    'URL 先が原因でチラシの取得に失敗しました。このエラーが数日続くようであれば変数を見直してください。'
                )
                data.to = userId
                pushMessages(JSON.stringify(data), lineToken)
                return
            } else if (fetchingBlobResponseCode >= 404) {
                const data = lineMessage.createError(
                    'URL 先にチラシがありません。変数を再設定してください。'
                )
                data.to = userId
                pushMessages(JSON.stringify(data), lineToken)
                return
            }

            const imageBlob = fetchingBlobResponse.getBlob()
            const text = convertImageIntoText(imageBlob)
            const matchedWordRegexps = wordRegexps.filter((wordRegexp) => {
                return wordRegexp.test(text)
            })

            if (matchedWordRegexps.length > 0) {
                const data = wordsMatchedMessage.create({
                    title: '掲載情報と言葉が一致しました！',
                    imageUrl: url,
                    matchedWords: matchedWordRegexps.map(
                        (regexp) => regexp.registered
                    )
                })
                data.to = userId

                pushMessages(JSON.stringify(data), lineToken)
            }
        })
    })
}

function convertImageIntoText(imageAsBlob: GoogleAppsScript.Base.Blob): string {
    const fileMeta = {
        title: imageAsBlob.getName(),
        mimeType: 'png'
        // mimeType: GoogleAppsScript.Base.MimeType.PNG
        // ^ When uncommenting the above, throw a type error around `fileMeta` of `Drive.Files.insert`
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const inserted = Drive.Files!.insert(fileMeta, imageAsBlob, {
        convert: true,
        ocr: true,
        ocrLanguage: 'ja'
    })

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const file = DriveApp.getFileById(inserted.id!)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const document = DocumentApp.openById(inserted.id!)
    const text = document.getBody().getText()

    file.setTrashed(true)

    return text
}
