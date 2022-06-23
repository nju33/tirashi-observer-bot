import type { WordSheetRepository } from '../domains/word'
import { InfrastructureError as _InfrastructureError } from '../error'

const InfrastructureError: typeof _InfrastructureError =
    typeof _InfrastructureError === 'undefined'
        ? exports.InfrastructureError
        : _InfrastructureError

export type WordSheetConstructorParameter = [
    Pick<GoogleAppsScript.Spreadsheet.SpreadsheetApp, 'getActive'>
]

export class TobWordSheetRepository implements WordSheetRepository {
    constructor(
        private readonly spreadsheetApp: WordSheetConstructorParameter[0]
    ) {}

    get(
        value: Parameters<WordSheetRepository['has']>[0]
    ): ReturnType<WordSheetRepository['get']> {
        const sheet = this.getSheet()
        const textFinder = sheet.createTextFinder(value)
        const next = textFinder.findNext()

        if (next == null) {
            throw InfrastructureError.WordDoesNotExist(value)
        }

        return sheet.getRange(next.getRow(), 2, 1, 2).getValues()[0] as [
            string,
            boolean
        ]
    }

    has(
        value: Parameters<WordSheetRepository['has']>[0]
    ): ReturnType<WordSheetRepository['has']> {
        const sheet = this.getSheet()
        const textFinder = sheet.createTextFinder(value)
        const next = textFinder.findNext()

        return next != null
    }

    insert(word: Parameters<WordSheetRepository['insert']>[0]): void {
        const sheet = this.getSheet()
        const lastRow = sheet.getLastRow()
        const insertingValues = word.toSheetValue()

        sheet
            .getRange(lastRow + 1, 2, 1, insertingValues.length)
            .setValues([insertingValues])
    }

    delete(word: Parameters<WordSheetRepository['delete']>[0]): void {
        const sheet = this.getSheet()
        const textFinder = sheet.createTextFinder(word.value)
        const next = textFinder.findNext()

        if (next == null) {
            throw InfrastructureError.WordDoesNotExist(word.value)
        }

        sheet.deleteRow(next.getRow())
    }

    private getSheet(): Pick<
        GoogleAppsScript.Spreadsheet.Sheet,
        'getLastRow' | 'getRange' | 'createTextFinder' | 'deleteRow'
    > {
        const sheetName = 'Words'
        const spreadsheet = this.spreadsheetApp.getActive()
        const sheet = spreadsheet.getSheetByName(sheetName)

        if (sheet == null) {
            throw InfrastructureError.SheetDoesNotExist(sheetName)
        }

        return sheet
    }
}
