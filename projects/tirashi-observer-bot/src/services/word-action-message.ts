import type { JsonObject } from 'type-fest'

export interface WordActionMessage {
    create: (
        value: string,
        flags: {
            exists: boolean
            active: boolean
        }
    ) => JsonObject
}
