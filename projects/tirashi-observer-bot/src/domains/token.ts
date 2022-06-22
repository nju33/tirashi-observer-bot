export interface Token {
    get: () => string
}

export abstract class AToken implements Token {
    private readonly value: string

    constructor(value: string) {
        this.value = value
    }

    get(): string {
        return this.value
    }
}
