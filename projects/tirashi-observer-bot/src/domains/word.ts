interface Word {
    value: string
    active: boolean
}

function reconstructWord(value: string, active: boolean): Word {
    return Object.freeze({ value, active })
}

function constructWord(value: string): Readonly<Word & ToSheetValue> {
    return Object.freeze({
        value,
        active: true,
        toSheetValue() {
            return [this.value, this.active]
        },
        toString(): string {
            return this.toSheetValue()?.join(',')
        }
    })
}

interface WordRepository {
    get: (value: string) => string[]
    has: (value: string) => boolean
    insert: (value: Word & ToSheetValue) => void
    delete: (value: Word) => void
}
