import { tobScriptPropertiesValueFactory } from './domains/script-properties'
import { replyMessages } from './infrastructure/line-fetch'
import { TobScriptProperties as _TobScriptProperties } from './infrastructure/script-properties'
import { TobUserSheetRepository as _TobUserSheetRepository } from './infrastructure/user-sheet'
import { TobWordSheetRepository as _TobWordSheetRepository } from './infrastructure/word-sheet'
import { TobWordsEachUsersSheetRepository as _TobWordsEachUsersSheetRepository } from './infrastructure/words-each-users-sheet'
import { examineFlyersByWords as _examineFlyersByWords } from './usecases/examine-flyers-by-words'

const TobScriptProperties: typeof _TobScriptProperties =
    typeof _TobScriptProperties === 'undefined'
        ? exports.TobScriptProperties
        : _TobScriptProperties
const TobUserSheetRepository: typeof _TobUserSheetRepository =
    typeof _TobUserSheetRepository === 'undefined'
        ? exports.TobUserSheetRepository
        : _TobUserSheetRepository
const TobWordSheetRepository: typeof _TobWordSheetRepository =
    typeof _TobWordSheetRepository === 'undefined'
        ? exports.TobWordSheetRepository
        : _TobWordSheetRepository
const TobWordsEachUsersSheetRepository: typeof _TobWordsEachUsersSheetRepository =
    typeof _TobWordsEachUsersSheetRepository === 'undefined'
        ? exports.TobWordsEachUsersSheetRepository
        : _TobWordsEachUsersSheetRepository
const examineFlyersByWords: typeof _examineFlyersByWords =
    typeof _examineFlyersByWords === 'undefined'
        ? exports.examineFlyersByWords
        : _examineFlyersByWords

function ok(): GoogleAppsScript.Content.TextOutput {
    return ContentService.createTextOutput('ok')
}

export function doGet(): GoogleAppsScript.Content.TextOutput {
    const userSheetRepository = new TobUserSheetRepository(SpreadsheetApp)
    const wordSheetRepository = new TobWordSheetRepository(SpreadsheetApp)
    const wordsEachUsersSheetRepository = new TobWordsEachUsersSheetRepository(
        SpreadsheetApp
    )
    const scriptProperties = new TobScriptProperties(
        tobScriptPropertiesValueFactory,
        PropertiesService
    )

    examineFlyersByWords({
        userSheetRepository,
        wordSheetRepository,
        wordsEachUsersSheetRepository,
        scriptProperties,
        fetch: replyMessages
    })
    return ok()
}
