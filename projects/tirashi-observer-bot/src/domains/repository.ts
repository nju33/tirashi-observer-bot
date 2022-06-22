import type { ToSheetValue } from './to-sheet-value'
import type { Word } from './word'

export interface SheetRepository {
    get: (value: string) => string[]
    has: (value: string) => boolean
    insert: (value: Word & ToSheetValue) => void
    delete: (value: Word) => void
}
