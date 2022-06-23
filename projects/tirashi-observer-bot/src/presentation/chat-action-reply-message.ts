import type { JsonValue, JsonObject } from 'type-fest'
import type { ChatActionReplyMessage } from '../services/chat-action-reply-message'
import {
    ChatQuickReplyLabels as _ChatQuickReplyLabels,
    ChatQucikReplyTexts as _ChatQucikReplyTexts
} from '../domains/chat'

const ChatQuickReplyLabels: typeof _ChatQuickReplyLabels =
    typeof _ChatQuickReplyLabels === 'undefined'
        ? exports.ChatQuickReplyLabels
        : _ChatQuickReplyLabels
const ChatQucikReplyTexts: typeof _ChatQucikReplyTexts =
    typeof _ChatQucikReplyTexts === 'undefined'
        ? exports.ChatQucikReplyTexts
        : _ChatQucikReplyTexts

const EMOJIS = Object.freeze({
    // https://cloud.nju33.com/iPGqKfzn0BLIjkLyMXDa
    hatena: {
        productId: '5ac21a8c040ab15980c9b43f',
        emojiId: '100'
    }
} as const)

/**
 * Display in the order of 登録, 有効化, 無効化, 削除
 *
 * 1. 登録 - Display when not registered
 * 2. 有効化 - Display when registered and inactivated
 * 3. 無効化 - Display when registered and activated
 * 4. 削除 - Display when registered
 */
export function constructQuickReply(
    value: string,
    flags: {
        exists: boolean
        active: boolean
    }
): JsonValue {
    const result = [] as JsonObject[]
    const toCreateAction: JsonObject = {
        type: 'action',
        imageUrl:
            'https://tirashi-observer-bot.web.app/tinified/circle-plus.png',
        action: {
            type: 'message',
            label: ChatQuickReplyLabels.Create,
            text: ChatQucikReplyTexts.Create(value)
        }
    }
    const toActivateAction: JsonValue = {
        type: 'action',
        imageUrl: 'https://tirashi-observer-bot.web.app/tinified/toggle-on.png',
        action: {
            type: 'message',
            label: ChatQuickReplyLabels.Activate,
            text: ChatQucikReplyTexts.Activate(value)
        }
    }
    const toInactivateAction: JsonValue = {
        type: 'action',
        imageUrl:
            'https://tirashi-observer-bot.web.app/tinified/toggle-off.png',
        action: {
            type: 'message',
            label: ChatQuickReplyLabels.Inactivate,
            text: ChatQucikReplyTexts.Inactivate(value)
        }
    }
    const toDeleteAction: JsonValue = {
        type: 'action',
        imageUrl:
            'https://tirashi-observer-bot.web.app/tinified/delete-right.png',
        action: {
            type: 'message',
            label: ChatQuickReplyLabels.Delete,
            text: ChatQucikReplyTexts.Delete(value)
        }
    }

    if (!flags.exists) {
        result.push(toCreateAction)
    }

    if (flags.exists && !flags.active) {
        result.push(toActivateAction)
    }

    if (flags.exists && flags.active) {
        result.push(toInactivateAction)
    }

    if (flags.exists) {
        result.push(toDeleteAction)
    }

    return result
}

export const chatActionReplyMessage: ChatActionReplyMessage = {
    create(value, flags) {
        return {
            messages: [
                {
                    type: 'text',
                    text: `$ 「${value}」`,
                    emojis: [
                        {
                            index: 0,
                            ...EMOJIS.hatena
                        }
                    ],
                    quickReply: {
                        items: constructQuickReply(value, flags)
                    }
                }
            ]
        }
    }
}
