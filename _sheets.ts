import { SHEET_NAMES as _SHEET_NAMES } from './projects/tirashi-observer-bot/src/constants'

const SHEET_NAMES: typeof _SHEET_NAMES =
    typeof _SHEET_NAMES === 'undefined' ? exports.SHEET_NAMES : _SHEET_NAMES

/**
 * Initialize sheets of the parent of a GAS script
 *
 * @param event - When executing `clasp run` with `—params`, to be an object is containing `params`
 */
export function _initSheets(): void {
    const spreadsheet = SpreadsheetApp.getActive()

    _initWords(spreadsheet)
    _initUsers(spreadsheet)
    _initMirroredWordsButIgnoringA(spreadsheet)
    _initWordsEachUsers(spreadsheet)
}

function getSheet(
    name: string,
    spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
): GoogleAppsScript.Spreadsheet.Sheet {
    const sheet = spreadsheet.getSheetByName(name)

    if (sheet == null) {
        return spreadsheet.insertSheet(name)
    }

    return sheet
}

function _initWords(
    spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
): void {
    const sheet = getSheet(SHEET_NAMES.Words, spreadsheet)

    sheet.getRange(1, 1).setFormula(
        // All of A colum values are made to concatenate the same line’s B and C.
        // But, it is to be blank if B is blank
        //
        // B: words
        // C: userId
        // (D): active
        '=arrayformula(if(isblank(B1:B), "", t(B1:B) & "," & t(C1:C)))'
    )

    // delete 2nd and subsequent lines to equal actual row length and `Sheet#getLastRow()`
    sheet.deleteRows(2, sheet.getMaxRows() - 1)
}

function _initUsers(
    spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
): void {
    const sheet = getSheet(SHEET_NAMES.Users, spreadsheet)

    sheet
        .getRange(1, 1)
        .setFormula('=sort(unique(index(Words!B:D, 0, 2)), 1, true)')
}

function _initMirroredWordsButIgnoringA(
    spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
): void {
    const sheet = getSheet(SHEET_NAMES.MirroredWordsButIgnoringA, spreadsheet)

    sheet.getRange(1, 1).setFormula('=index(Words!B2:D)')
}

function _initWordsEachUsers(
    spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet
): void {
    const sheet = getSheet(SHEET_NAMES.WordsEachUsers, spreadsheet)

    sheet
        .getRange(1, 1)
        .setFormula(
            '=arrayformula(concatenateActiveWords(Users!A1:A, MirroredWordsButIgnoringA!A1:C))'
        )
}
