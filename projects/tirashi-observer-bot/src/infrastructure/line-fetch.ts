import { fetch as _fetch } from './fetch'
import type { ReplyMessages, PushMessages } from '../services/line-fetch'

const fetch: typeof _fetch =
    typeof _fetch === 'undefined' ? exports.fetch : _fetch

/**
 * https://developers.line.biz/ja/docs/messaging-api/sending-messages/#reply-messages
 */
export const replyMessages: ReplyMessages = (data, bearerToken) => {
    const URL = 'https://api.line.me/v2/bot/message/reply'

    return fetch(
        URL,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`
            },
            data
        },
        false
    ).getContentText()
}

/**
 * https://developers.line.biz/en/reference/messaging-api/#send-push-message
 */
export const pushMessages: PushMessages = (
    data: string,
    bearerToken: string
) => {
    const URL = 'https://api.line.me/v2/bot/message/push'

    return fetch(
        URL,
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${bearerToken}`
            },
            data
        },
        false
    ).getContentText()
}
