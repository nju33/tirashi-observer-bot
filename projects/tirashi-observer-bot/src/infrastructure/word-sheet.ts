import type { Word, WordSheetRepository, WordSheetValue } from '../domains/word'
import { InfrastructureError as _InfrastructureError } from '../error'
import { SHEET_NAMES as _SHEET_NAMES } from '../constants'

const SHEET_NAMES: typeof _SHEET_NAMES =
    typeof _SHEET_NAMES === 'undefined' ? exports.SHEET_NAMES : _SHEET_NAMES
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
        value: Parameters<WordSheetRepository['get']>[0],
        userId: Parameters<WordSheetRepository['get']>[1]
    ): ReturnType<WordSheetRepository['get']> {
        const sheet = this.getSheet()
        const textFinder = sheet.createTextFinder(this.getKey(value, userId))
        const next = textFinder.findNext()

        if (next == null) {
            throw InfrastructureError.WordDoesNotExist(value)
        }

        return sheet
            .getRange(...this.getRangeValues(next.getRow()))
            .getValues()[0] as WordSheetValue
    }

    getAll(
        userId: Parameters<WordSheetRepository['getAll']>[0]
    ): ReturnType<WordSheetRepository['getAll']> {
        const sheet = this.getSheet()
        const textFinder = sheet.createTextFinder(this.getKey('', userId))
        const ranges = textFinder.findAll()

        return ranges.map((range) => {
            const rangeValues = this.getRangeValues(range.getRow())
            return sheet
                .getRange(...rangeValues)
                .getValues()[0] as WordSheetValue
        })
    }

    // has(
    //     value: Parameters<WordSheetRepository['has']>[0]
    // ): ReturnType<WordSheetRepository['has']> {
    //     const sheet = this.getSheet()
    //     const textFinder = sheet.createTextFinder(value)
    //     const next = textFinder.findNext()

    //     return next != null
    // }

    insert(
        word: Parameters<WordSheetRepository['insert']>[0]
    ): ReturnType<WordSheetRepository['insert']> {
        const sheet = this.getSheet()
        const lastRow = sheet.getLastRow()
        const insertingValues = word.toSheetValue()

        sheet
            .getRange(...this.getRangeValues(lastRow + 1))
            .setValues([insertingValues])
    }

    update(
        word: Parameters<WordSheetRepository['update']>[0]
    ): ReturnType<WordSheetRepository['update']> {
        const sheet = this.getSheet()
        const textFinder = sheet.createTextFinder(this.getKey(word))
        const next = textFinder.findNext()

        if (next == null) {
            throw InfrastructureError.WordDoesNotExist(word.value)
        }

        sheet
            .getRange(...this.getRangeValues(next.getRow()))
            .setValues([word.toSheetValue()])
    }

    delete(
        word: Parameters<WordSheetRepository['delete']>[0]
    ): ReturnType<WordSheetRepository['delete']> {
        const sheet = this.getSheet()
        const textFinder = sheet.createTextFinder(this.getKey(word))
        const next = textFinder.findNext()

        if (next == null) {
            throw InfrastructureError.WordDoesNotExist(word.value)
        }

        sheet.deleteRow(next.getRow())
    }

    private getKey(value: string, userId: string): string
    private getKey(word: Word): string
    private getKey(...args: [string, string] | [Word]): string {
        if (typeof args[0] === 'string') {
            return args.join(',')
        }

        return args[0].toString()
    }

    private getSheet(): Pick<
        GoogleAppsScript.Spreadsheet.Sheet,
        'getLastRow' | 'getRange' | 'createTextFinder' | 'deleteRow'
    > {
        const sheetName = SHEET_NAMES.Words
        const spreadsheet = this.spreadsheetApp.getActive()
        const sheet = spreadsheet.getSheetByName(sheetName)

        if (sheet == null) {
            throw InfrastructureError.SheetDoesNotExist(sheetName)
        }

        return sheet
    }

    private getRangeValues(row: number): [number, number, number, number] {
        // For example, when the row is 3, the range is to be `B3:D3`
        return [row, 2, 1, 3]
    }
}
