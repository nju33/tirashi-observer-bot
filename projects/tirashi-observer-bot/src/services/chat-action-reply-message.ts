import type { JsonObject } from 'type-fest'

export interface ChatActionReplyMessage {
    create: (
        value: string,
        flags: {
            exists: boolean
            active: boolean
        }
    ) => JsonObject
}

export function matchCreateQuickReplyOfChat(message: string): string | undefined {
    const matched = message.match(/「([^」]+)」を作成/)
    return matched?.[1]
}

export function matchActivateQuickReplyOfChat(message: string): string | undefined {
    const matched = message.match(/「([^」]+)」を有効化/)
    return matched?.[1]
}

export function matchInactivateQuickReplyOfChat(
    message: string
): string | undefined {
    const matched = message.match(/「([^」]+)」を無効化/)
    return matched?.[1]
}

export function matchDeleteQuickReplyOfChat(message: string): string | undefined {
    const matched = message.match(/「([^」]+)」を削除/)
    return matched?.[1]
}
