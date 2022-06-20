/**
 * https://developers.line.biz/ja/docs/messaging-api/sending-messages/#reply-messages
 */
function replyMessages(data: string, bearerToken: string): string {
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
 * https://developers.line.biz/ja/reference/messaging-api/#send-broadcast-message
 */
function sendBroadcastMessage(data: string, bearerToken: string): string {
    const URL = 'https://api.line.me/v2/bot/message/broadcast'

    return fetchText(URL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${bearerToken}`
        },
        data
    })
}
