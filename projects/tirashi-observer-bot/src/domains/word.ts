interface Word extends ValueObject {
    value: string
    active: boolean
}

function createWord(value: string): Readonly<Word> {
    return Object.freeze({
        value,
        active: true,
        toArray(): [string, boolean] {
            return [this.value, this.active]
        },
        toString(): string {
            return this.toArray().join(',')
        }
    })
}

interface WordRepository {
    insert: (word: Word) => void
    delete: (word: Word) => void
}
