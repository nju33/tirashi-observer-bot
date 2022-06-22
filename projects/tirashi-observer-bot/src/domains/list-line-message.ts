import type { JsonValue } from 'type-fest'
import type { TobWord } from './word'

export interface ListLineMessage {
    create: (words: TobWord[]) => JsonValue
}
