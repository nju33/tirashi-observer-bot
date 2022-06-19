/**
 * Initialize sheets of the parent of a GAS script
 *
 * @param event - When executing `clasp run` with `—params`, to be an object is containing `params`
 */
function _initSheets(): void {
    const spreadsheet = SpreadsheetApp.getActive()
    const sheet = spreadsheet.getSheetByName(SHEET_NAMES.Words)

    if (sheet == null) {
        throw InfrastructureError.SheetDoesNotExist(SHEET_NAMES.Words)
    }

    sheet.getRange(1, 1).setFormula(
        // All of A colum values are made to concatenate the same line’s B, C and D.
        // But, it is to be blank if B is blank
        '=arrayformula(if(isblank(B1:B), "", to_text(B1:B) & "," & t(C1:C) & "," & to_text(D1:D)))'
    )
}
