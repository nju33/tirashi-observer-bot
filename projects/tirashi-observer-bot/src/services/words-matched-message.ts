import type { JsonObject } from 'type-fest'

export interface WordsMatchedMessage {
    create: (props: {
        title: string
        imageUrl: string
        matchedWords: string[]
    }) => JsonObject
}
