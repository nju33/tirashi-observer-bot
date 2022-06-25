import { tobScriptPropertiesValueFactory } from './domains/script-properties'
import { pushMessages as _pushMessages } from './infrastructure/line-fetch'
import { TobScriptProperties as _TobScriptProperties } from './infrastructure/script-properties'
import { TobUserSheetRepository as _TobUserSheetRepository } from './infrastructure/user-sheet'
import { TobWordsEachUsersSheetRepository as _TobWordsEachUsersSheetRepository } from './infrastructure/words-each-users-sheet'
import { TobWordsMatchedMessage as _TobWordsMatchedMessage } from './presentation/words-matched-message'
import { examineFlyersByWords as _examineFlyersByWords } from './usecases/examine-flyers-by-words'

const pushMessages: typeof _pushMessages =
    typeof _pushMessages === 'undefined' ? exports.pushMessages : _pushMessages
const TobScriptProperties: typeof _TobScriptProperties =
    typeof _TobScriptProperties === 'undefined'
        ? exports.TobScriptProperties
        : _TobScriptProperties
const TobUserSheetRepository: typeof _TobUserSheetRepository =
    typeof _TobUserSheetRepository === 'undefined'
        ? exports.TobUserSheetRepository
        : _TobUserSheetRepository
const TobWordsEachUsersSheetRepository: typeof _TobWordsEachUsersSheetRepository =
    typeof _TobWordsEachUsersSheetRepository === 'undefined'
        ? exports.TobWordsEachUsersSheetRepository
        : _TobWordsEachUsersSheetRepository
const TobWordsMatchedMessage: typeof _TobWordsMatchedMessage =
    typeof _TobWordsMatchedMessage === 'undefined'
        ? exports.TobWordsMatchedMessage
        : _TobWordsMatchedMessage
const examineFlyersByWords: typeof _examineFlyersByWords =
    typeof _examineFlyersByWords === 'undefined'
        ? exports.examineFlyersByWords
        : _examineFlyersByWords

function ok(): GoogleAppsScript.Content.TextOutput {
    return ContentService.createTextOutput('ok')
}

export function doGet(): GoogleAppsScript.Content.TextOutput {
    const userSheetRepository = new TobUserSheetRepository(SpreadsheetApp)
    const wordsEachUsersSheetRepository = new TobWordsEachUsersSheetRepository(
        SpreadsheetApp
    )
    const scriptProperties = new TobScriptProperties(
        tobScriptPropertiesValueFactory,
        PropertiesService
    )
    const wordsMatchedMessage = new TobWordsMatchedMessage()

    examineFlyersByWords({
        userSheetRepository,
        wordsEachUsersSheetRepository,
        scriptProperties,
        wordsMatchedMessage,
        fetch: pushMessages
    })

    return ok()
}
