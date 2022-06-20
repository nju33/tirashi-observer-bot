interface Repository<T = {}> {
    insert: (object: T & ToSheetValue) => void
    delete: (object: T & ToSheetValue) => void
}
