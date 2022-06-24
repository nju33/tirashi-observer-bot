import { InfrastructureError as _InfrastructureError } from '../error'
import { SHEET_NAMES as _SHEET_NAMES } from '../constants'
import { UserSheetRepository } from '../domains/user'

const SHEET_NAMES: typeof _SHEET_NAMES =
    typeof _SHEET_NAMES === 'undefined' ? exports.SHEET_NAMES : _SHEET_NAMES
const InfrastructureError: typeof _InfrastructureError =
    typeof _InfrastructureError === 'undefined'
        ? exports.InfrastructureError
        : _InfrastructureError

export type UserSheetConstructorParameter = [
    Pick<GoogleAppsScript.Spreadsheet.SpreadsheetApp, 'getActive'>
]

export class TobUserSheetRepository implements UserSheetRepository {
    constructor(
        private readonly spreadsheetApp: UserSheetConstructorParameter[0]
    ) {}

    getAll(): ReturnType<UserSheetRepository['getAll']> {
        const sheet = this.getSheet()
        const dataRange = sheet.getDataRange()
        const from = dataRange.getRow()
        const to = dataRange.getLastRow()

        return sheet.getRange(from, 1, to, 1).getValues().flat()
    }

    private getSheet(): Pick<
        GoogleAppsScript.Spreadsheet.Sheet,
        'getDataRange' | 'getRange'
    > {
        const sheetName = SHEET_NAMES.Users
        const spreadsheet = this.spreadsheetApp.getActive()
        const sheet = spreadsheet.getSheetByName(sheetName)

        if (sheet == null) {
            throw InfrastructureError.SheetDoesNotExist(sheetName)
        }

        return sheet
    }
}
