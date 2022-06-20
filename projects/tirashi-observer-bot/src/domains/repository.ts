interface Repository<T = {}> {
    insert: (object: T & ToSheetValue) => void
    has: (object: T & ToSheetValue) => boolean
    delete: (object: T & ToSheetValue) => void
}
