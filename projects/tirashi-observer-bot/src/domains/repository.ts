interface Repository<T> {
    insert: (object: T) => void
    delete: (object: T) => void
}
