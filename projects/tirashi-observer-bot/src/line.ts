/**
 * https://developers.line.biz/ja/reference/messaging-api/#common-properties
 */
interface LineEventCommon {
    replyToken: string
    type: 'message'
}

/**
 * https://developers.line.biz/ja/reference/messaging-api/#message-event
 */
interface LineMessageEvent extends LineEventCommon {
    message: {
        type: 'text'
        text: string
    }
}

/**
 * https://developers.line.biz/ja/reference/messaging-api/#postback-event
 */
interface LinePostbackEvent extends LineEventCommon {
    postback: {
        data: string
    }
}

interface LineParameter {
    destination: string
    events: Array<LineEventCommon | LinePostbackEvent>
}

function isLineMessageEvent(
    event: LineParameter['events'][0]
): event is LineMessageEvent {
    return (
        Object.prototype.hasOwnProperty.call(event, 'message') &&
        typeof (event as any).message === 'object'
    )
}
