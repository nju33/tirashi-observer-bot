import { fetchText as _fetchText } from './fetch'
import type { ReplyMessages, PushMessages } from '../services/line-fetch'

const fetchText: typeof _fetchText =
    typeof _fetchText === 'undefined' ? exports.fetchText : _fetchText

/**
 * https://developers.line.biz/ja/docs/messaging-api/sending-messages/#reply-messages
 */
export const replyMessages: ReplyMessages = (data, bearerToken) => {
    const URL = 'https://api.line.me/v2/bot/message/reply'

    return fetchText(URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`
        },
        data
    })
}

/**
 * https://developers.line.biz/en/reference/messaging-api/#send-push-message
 */
export const pushMessages: PushMessages = (
    data: string,
    bearerToken: string
) => {
    const URL = 'https://api.line.me/v2/bot/message/push'

    return fetchText(URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`
        },
        data
    })
}
