class InfrastructureError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, InfrastructureError.prototype)
    }

    static SheetDoesNotExist(sheetName: string): InfrastructureError {
        return new InfrastructureError(
            'The sheet named "'.concat(sheetName, '" doesns\'t exist')
        )
    }
}
