import type { WordSheetRepository } from '../domains/word'
import type { PushMessages } from '../services/line-fetch'
import type { ScriptProperties } from '../domains/script-properties'
import type { UserSheetRepository } from '../domains/user'
import type { WordsEachUsersSheetRepository } from '../domains/words-each-users'
import { TobWordRegexp as _TobWordRegexp } from '../domains/regexp'

const TobWordRegexp: typeof _TobWordRegexp =
    typeof _TobWordRegexp === 'undefined'
        ? exports.TobWordRegexp
        : _TobWordRegexp

export function examineFlyersByWords({
    userSheetRepository,
    wordSheetRepository,
    wordsEachUsersSheetRepository,
    fetch,
    scriptProperties
}: {
    userSheetRepository: UserSheetRepository
    wordSheetRepository: WordSheetRepository
    wordsEachUsersSheetRepository: WordsEachUsersSheetRepository
    fetch: PushMessages
    scriptProperties: ScriptProperties
}): void {
    const userIds = userSheetRepository.getAll()
    const tirashiUrls = scriptProperties.getTirashiUrl().get()

    userIds.forEach((userId, index) => {
        // Separated by using comma
        const concatenatedString = wordsEachUsersSheetRepository.get(index)
        const wordValues = concatenatedString.split(',')
        const wordRegexps = wordValues.map((r) => new TobWordRegexp(r))

        tirashiUrls.forEach((url) => {
            const imageBlob = UrlFetchApp.fetch(url).getBlob()
            const text = convertImageIntoText(imageBlob)
            const matchedWordRegexps = wordRegexps.filter((wordRegexp) => {
                return wordRegexp.test(text)
            })

            if (matchedWordRegexps.length > 0) {
                pushMessages()
                // TODO: image post by userId
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
