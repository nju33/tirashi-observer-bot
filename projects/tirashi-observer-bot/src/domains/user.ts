export interface User {
    id: string
}

export class TobUser implements User {
    constructor(public id: string) {}
}

export interface UserSheetRepository {
    getAll: () => string[]
}
