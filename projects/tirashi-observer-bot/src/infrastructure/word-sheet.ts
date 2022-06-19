class WordSheet implements WordRepository {
    insert(word: Word): void {
        const sheet = this.getSheet()
        const lastRow = sheet.getLastRow()
        const insertingValues = word.toArray()

        sheet
            .getRange(lastRow + 1, insertingValues.length)
            .setValues(insertingValues as any)
    }

    delete(word: Word): void {
        const sheet = this.getSheet()
    }

    private getSheet(): GoogleAppsScript.Spreadsheet.Sheet {
        const sheetName = 'Word'
        const spreadsheet = SpreadsheetApp.getActive()
        const sheet = spreadsheet.getSheetByName(sheetName)

        if (sheet == null) {
            throw InfrastructureError.SheetDoesNotExist(sheetName)
        }

        return sheet
    }
}
