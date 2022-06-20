class WordSheet implements WordRepository {
    get(
        value: Parameters<WordRepository['has']>[0]
    ): ReturnType<WordRepository['get']> {
        const sheet = this.getSheet()
        const textFinder = sheet.createTextFinder(value)
        const next = textFinder.findNext()

        if (next == null) {
            throw InfrastructureError.WordDoesNotExist(value)
        }

        return sheet.getRange(next.getRow() + 1, 2, 0, 2).getValues()[0]
    }

    has(
        value: Parameters<WordRepository['has']>[0]
    ): ReturnType<WordRepository['has']> {
        const sheet = this.getSheet()
        const textFinder = sheet.createTextFinder(value)
        const next = textFinder.findNext()

        return next != null
    }

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
        const sheetName = 'Words'
        const spreadsheet = SpreadsheetApp.getActive()
        const sheet = spreadsheet.getSheetByName(sheetName)

        if (sheet == null) {
            throw InfrastructureError.SheetDoesNotExist(sheetName)
        }

        return sheet
    }
}
