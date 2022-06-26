import { tobScriptPropertiesValueFactory } from './domains/script-properties'
import { fetch as _fetch } from './infrastructure/fetch'
import { pushMessages as _pushMessages } from './infrastructure/line-fetch'
import { TobScriptProperties as _TobScriptProperties } from './infrastructure/script-properties'
import { TobUserSheetRepository as _TobUserSheetRepository } from './infrastructure/user-sheet'
import { TobDocument as _TobDocument } from './infrastructure/document'
import { TobDrive as _TobDrive } from './infrastructure/drive'
import { TobWordsEachUsersSheetRepository as _TobWordsEachUsersSheetRepository } from './infrastructure/words-each-users-sheet'
import { TobWordsMatchedMessage as _TobWordsMatchedMessage } from './presentation/words-matched-message'
import { examineFlyersByWords as _examineFlyersByWords } from './usecases/examine-flyers-by-words'
import { lineMessage as _lineMessage } from './presentation/line-message'

const pushMessages: typeof _pushMessages =
    typeof _pushMessages === 'undefined' ? exports.pushMessages : _pushMessages
const fetch: typeof _fetch =
    typeof _fetch === 'undefined' ? exports.fetch : _fetch
const TobScriptProperties: typeof _TobScriptProperties =
    typeof _TobScriptProperties === 'undefined'
        ? exports.TobScriptProperties
        : _TobScriptProperties
const TobUserSheetRepository: typeof _TobUserSheetRepository =
    typeof _TobUserSheetRepository === 'undefined'
        ? exports.TobUserSheetRepository
        : _TobUserSheetRepository
const TobDocument: typeof _TobDocument =
    typeof _TobDocument === 'undefined' ? exports.TobDocument : _TobDocument
const TobDrive: typeof _TobDrive =
    typeof _TobDrive === 'undefined' ? exports.TobDrive : _TobDrive
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
const lineMessage: typeof _lineMessage =
    typeof _lineMessage === 'undefined' ? exports.lineMessage : _lineMessage

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
    const document = new TobDocument(DocumentApp)
    const drive = new TobDrive(Drive)

    examineFlyersByWords({
        userSheetRepository,
        wordsEachUsersSheetRepository,
        scriptProperties,
        wordsMatchedMessage,
        fetch,
        document,
        drive,
        pushMessages,
        lineMessage
    })

    return ok()
}
