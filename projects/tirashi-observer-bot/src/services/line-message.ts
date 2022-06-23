import type { JsonObject } from 'type-fest'

export interface LineMessage {
    createSuccess: (message: string) => JsonObject
    createWarning: (message: string) => JsonObject
    createError: (message: string) => JsonObject
}
