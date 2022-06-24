import type { User } from './user'
import { TobUser } from './user'
import type { ToSheetValue } from './to-sheet-value'

export interface Word {
    value: string
    active: boolean
    user: User
}

export type WordSheetValue = [
    Word['value'],
    string /* userId */,
    Word['active']
]

export class TobWord implements Word, ToSheetValue {
    private readonly _value: string
    private readonly _active: boolean
    private readonly _user: User

    constructor(value: string, userId: string, active: boolean)
    constructor(value: string, userId: string)
    constructor(value: string, userId: string, active?: boolean) {
        this._value = value
        this._active = active ?? true

        this._user = new TobUser(userId)
    }

    static reconstruct(
        value: string,
        userId: string,
        active: boolean
    ): TobWord {
        return new TobWord(value, userId, active)
    }

    get value(): string {
        return this._value
    }

    get active(): boolean {
        return this._active
    }

    get user(): User {
        return this._user
    }

    toSheetValue(): WordSheetValue {
        return [this.value, this.user.id, this.active]
    }

    toString(): string {
        return [this.value, this.user.id].join(',')
        // In GAS, `to_text(boolean)` is to be `TRUE` or `FALSE`
        // return [this.value, this.active ? 'TRUE' : 'FALSE'].join(',')
    }
}

export interface WordSheetRepository {
    get: (value: string, userId: string) => WordSheetValue
    getAll: (userId: string) => WordSheetValue[]
    // has: (value: string) => boolean
    insert: (value: Word & ToSheetValue) => void
    update: (value: Word & ToSheetValue) => void
    delete: (value: Word) => void
}
