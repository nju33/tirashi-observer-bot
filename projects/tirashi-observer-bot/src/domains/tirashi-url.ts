export interface SeparatingStringByComma {
    get: () => string[]
}

export abstract class ASeparatingStringByComma
    implements SeparatingStringByComma
{
    protected readonly value: string[]

    constructor(value: string) {
        this.value = value.split(',')
    }

    get(): string[] {
        return this.value
    }
}

export class TirashiUrl extends ASeparatingStringByComma {
    /**
     * Get the `TIRASHI_URL` values with a timestamp
     *
     * When accesing the same flyer URL, there is a the flyer URL remain old
     * due to the cache in the Line side.
     * Therefore, a timestamp is added to each the end of URLs
     *
     * @returns URLs that added the timestamp at the end.
     */
    get(): string[] {
        return this.value.map((url) => {
            return [url, Date.now()].join(url.endsWith('/') ? '' : '/')
        })
    }
}
