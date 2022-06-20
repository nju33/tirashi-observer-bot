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
function constructQuickReply(
    value: string,
    flags: {
        exists: boolean
        active: boolean
    }
): import('type-fest').JsonValue {
    const result = [] as Array<import('type-fest').JsonObject>
    const toCreateAction: import('type-fest').JsonObject = {
        type: 'action',
        imageUrl:
            'https://tirashi-observer-bot.web.app/tinified/circle-plus.png',
        action: {
            type: 'message',
            label: '...を登録',
            text: `「${value}」を登録'`
        }
    }
    const toActivateAction: import('type-fest').JsonValue = {
        type: 'action',
        imageUrl: 'https://tirashi-observer-bot.web.app/tinified/toggle-on.png',
        action: {
            type: 'message',
            label: '...を有効化',
            text: `「${value}」を有効化`
        }
    }
    const toInactivateAction: import('type-fest').JsonValue = {
        type: 'action',
        imageUrl:
            'https://tirashi-observer-bot.web.app/tinified/toggle-off.png',
        action: {
            type: 'message',
            label: '...を無効化',
            text: `「${value}」を無効化'`
        }
    }
    const toDeleteAction: import('type-fest').JsonValue = {
        type: 'action',
        imageUrl:
            'https://tirashi-observer-bot.web.app/tinified/delete-right.png',
        action: {
            type: 'message',
            label: '...を削除',
            text: `「${value}」を削除`
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

const wordActionMessage: WordActionMessage = {
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
