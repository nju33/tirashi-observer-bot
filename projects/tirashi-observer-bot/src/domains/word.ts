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

type WordRepository = Repository<Word>
