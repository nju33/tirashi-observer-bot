export interface SeparatingStringByComma {
    get: () => string[]
}

export abstract class ASeparatingStringByComma
    implements SeparatingStringByComma
{
    private readonly value: string[]

    constructor(value: string) {
        this.value = value.split(',')
    }

    get(): string[] {
        return this.value
    }
}

export class TirashiUrl extends ASeparatingStringByComma {}
