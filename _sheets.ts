import { SHEET_NAMES as _SHEET_NAMES } from './projects/tirashi-observer-bot/src/constants'
import { InfrastructureError as _InfrastructureError } from './projects/tirashi-observer-bot/src/error'

const SHEET_NAMES: typeof _SHEET_NAMES =
    typeof _SHEET_NAMES === 'undefined' ? exports.SHEET_NAMES : _SHEET_NAMES
const InfrastructureError: typeof _InfrastructureError =
    typeof _InfrastructureError === 'undefined'
        ? exports.InfrastructureError
        : _InfrastructureError

/**
 * Initialize sheets of the parent of a GAS script
 *
 * @param event - When executing `clasp run` with `—params`, to be an object is containing `params`
 */
export function _initSheets(): void {
    const spreadsheet = SpreadsheetApp.getActive()
    const sheet = spreadsheet.getSheetByName(SHEET_NAMES.Words)

    if (sheet == null) {
        throw InfrastructureError.SheetDoesNotExist(SHEET_NAMES.Words)
    }

    sheet.getRange(1, 1).setFormula(
        // All of A colum values are made to concatenate the same line’s B and C.
        // But, it is to be blank if B is blank
        '=arrayformula(if(isblank(B1:B), "", t(B1:B) & "," & to_text(C1:C)))'
    )

    // delete 2nd and subsequent lines to equal actual row length and `Sheet#getRow()`
    sheet.deleteRows(2, sheet.getMaxRows() - 1)
}
