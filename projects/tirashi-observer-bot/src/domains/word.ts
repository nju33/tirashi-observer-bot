import type { ToSheetValue } from './to-sheet-value'

export interface Word {
    value: string
    active: boolean
}

export function reconstructWord(
    value: string,
    active: boolean
): Readonly<Word & ToSheetValue> {
    return Object.freeze({
        value,
        active,
        toSheetValue() {
            return [this.value, this.active]
        },
        toString(): string {
            return this.toSheetValue().join(',')
        }
    })
}

export function constructWord(value: string): Readonly<Word & ToSheetValue> {
    return Object.freeze({
        value,
        active: true,
        toSheetValue() {
            return [this.value, this.active]
        },
        toString(): string {
            return this.toSheetValue().join(',')
        }
    })
}

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

    toSheetValue(): [string, boolean] {
        return [this.value, this.active]
    }

    toString(): string {
        return this.toSheetValue().join(',')
    }
}

export interface WordSheetRepository {
    get: (value: string) => string[]
    has: (value: string) => boolean
    insert: (value: Word & ToSheetValue) => void
    delete: (value: Word) => void
}
