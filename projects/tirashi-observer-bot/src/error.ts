type InfrastructureErrorFrom = 'WordDoesNotExist' | 'SheetDoesNotExist'

class InfrastructureError extends Error {
    #from?: InfrastructureErrorFrom

    constructor(message: string, from?: InfrastructureErrorFrom) {
        super(message)
        this.#from = from
        Object.setPrototypeOf(this, InfrastructureError.prototype)
    }

    getFrom(): InfrastructureErrorFrom | undefined {
        return this.#from
    }

    static WordDoesNotExist(wordValue: string): InfrastructureError {
        return new InfrastructureError(`「${wordValue}」は未登録です。`)
    }

    static SheetDoesNotExist(sheetName: string): InfrastructureError {
        return new InfrastructureError(
            `「${sheetName}」は存在しないシート名です。`
        )
    }
}

class UseCaseWarning extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, UseCaseWarning.prototype)
    }

    static WordIsAlreadyExisted(wordValue: string): UseCaseWarning {
        return new UseCaseWarning(`「${wordValue}」は既に登録済みです。`)
    }
}
