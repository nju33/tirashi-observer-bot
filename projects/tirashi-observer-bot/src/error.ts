export type InfrastructureErrorFrom =
    | 'WordDoesNotExist'
    | 'SheetDoesNotExist'
    | 'ScriptPropertyDoesNotExist'

export class InfrastructureError extends Error {
    private readonly from: InfrastructureErrorFrom

    constructor(message: string, from: InfrastructureErrorFrom) {
        super(message)
        this.from = from
        Object.setPrototypeOf(this, InfrastructureError.prototype)
    }

    getFrom(): InfrastructureErrorFrom | undefined {
        return this.from
    }

    static WordDoesNotExist(wordValue: string): InfrastructureError {
        return new InfrastructureError(
            `「${wordValue}」は未登録です。`,
            'WordDoesNotExist'
        )
    }

    static SheetDoesNotExist(sheetName: string): InfrastructureError {
        return new InfrastructureError(
            `「${sheetName}」は存在しないシート名です。`,
            'SheetDoesNotExist'
        )
    }

    static ScriptPropertyDoesNotExist(key: string): InfrastructureError {
        return new InfrastructureError(
            `「${key}」は存在しないスクリプトプロパティです。`,
            'ScriptPropertyDoesNotExist'
        )
    }
}

export class UseCaseWarning extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, UseCaseWarning.prototype)
    }

    static WordIsAlreadyExisted(wordValue: string): UseCaseWarning {
        return new UseCaseWarning(`「${wordValue}」は既に登録済みです。`)
    }
}
