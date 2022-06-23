export type ChatQuickReplyEnumKeys =
    | 'Create'
    | 'Activate'
    | 'Inactivate'
    | 'Delete'

export const ChatQuickReplyLabels: {
    readonly [key in ChatQuickReplyEnumKeys]: string
} = {
    Create: '...を作成',
    Activate: '...を有効化',
    Inactivate: '...を無効化',
    Delete: '...を削除'
}

export const ChatQucikReplyTexts: {
    readonly [key in ChatQuickReplyEnumKeys]: (value: string) => string
} = {
    Create(value) {
        return `「${value}」を作成`
    },
    Activate(value) {
        return `「${value}」を有効化`
    },
    Inactivate(value) {
        return `「${value}」を無効化`
    },
    Delete(value) {
        return `「${value}」を削除`
    }
}
