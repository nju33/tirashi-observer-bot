import { InfrastructureError as _InfrastructureError } from '../error'
import { SHEET_NAMES as _SHEET_NAMES } from '../constants'
import { WordsEachUsersSheetRepository } from '../domains/words-each-users'

const SHEET_NAMES: typeof _SHEET_NAMES =
    typeof _SHEET_NAMES === 'undefined' ? exports.SHEET_NAMES : _SHEET_NAMES
const InfrastructureError: typeof _InfrastructureError =
    typeof _InfrastructureError === 'undefined'
        ? exports.InfrastructureError
        : _InfrastructureError

export type UserSheetConstructorParameter = [
    Pick<GoogleAppsScript.Spreadsheet.SpreadsheetApp, 'getActive'>
]

export class TobWordsEachUsersSheetRepository
    implements WordsEachUsersSheetRepository
{
    constructor(
        private readonly spreadsheetApp: UserSheetConstructorParameter[0]
    ) {}

    get(
        index: Parameters<WordsEachUsersSheetRepository['get']>[0]
    ): ReturnType<WordsEachUsersSheetRepository['get']> {
        const sheet = this.getSheet()
        return sheet.getRange(index + 1, 1).getValue()
    }

    private getSheet(): Pick<
        GoogleAppsScript.Spreadsheet.Sheet,
        'getDataRange' | 'getRange'
    > {
        const sheetName = SHEET_NAMES.WordsEachUsers
        const spreadsheet = this.spreadsheetApp.getActive()
        const sheet = spreadsheet.getSheetByName(sheetName)

        if (sheet == null) {
            throw InfrastructureError.SheetDoesNotExist(sheetName)
        }

        return sheet
    }
}
