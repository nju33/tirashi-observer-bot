import type { ToSheetValue } from './to-sheet-value'

export interface Word {
    value: string
    active: boolean
}

export type WordSheetValue = [Word['value'], Word['active']]

export class TobWord implements Word, ToSheetValue {
    private readonly _value: string
    private readonly _active: boolean

    constructor(value: string, active: boolean)
    constructor(value: string)
    constructor(value: string, active?: boolean) {
        this._value = value
        this._active = active ?? true
    }

    static reconstruct(value: string, active: boolean): TobWord {
        return new TobWord(value, active)
    }

    get value(): string {
        return this._value
    }

    get active(): boolean {
        return this._active
    }

    toSheetValue(): WordSheetValue {
        return [this.value, this.active]
    }

    toString(): string {
        // In GAS, `to_text(boolean)` is to be `TRUE` or `FALSE`
        return [this.value, this.active ? 'TRUE' : 'FALSE'].join(',')
    }
}

export interface WordSheetRepository {
    get: (value: string) => WordSheetValue
    getAll: () => WordSheetValue[]
    has: (value: string) => boolean
    insert: (value: Word & ToSheetValue) => void
    delete: (value: Word) => void
}
