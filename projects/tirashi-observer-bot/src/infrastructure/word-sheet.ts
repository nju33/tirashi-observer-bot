class WordSheet implements WordRepository {
    insert(word: Parameters<WordRepository['insert']>[0]): void {
        const sheet = this.getSheet()
        const lastRow = sheet.getLastRow()
        const insertingValues = word.toSheetValue()

        sheet
            .getRange(lastRow + 1, insertingValues.length)
            .setValues(insertingValues as any)
    }

    delete(word: Parameters<WordRepository['delete']>[0]): void {
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
