/**
 * https://developers.line.biz/ja/reference/messaging-api/#common-properties
 */
interface LineEventCommon {
    replyToken: string
    type: 'message'
    source: {
        type: 'user',
        userId: string
    }
}

/**
 * https://developers.line.biz/ja/reference/messaging-api/#message-event
 */
export interface LineMessageEvent extends LineEventCommon {
    message: {
        type: 'text'
        text: string
    }
}

/**
 * https://developers.line.biz/ja/reference/messaging-api/#postback-event
 */
export interface LinePostbackEvent extends LineEventCommon {
    postback: {
        data: string
    }
}

export interface LineParameter {
    destination: string
    events: Array<LineEventCommon | LinePostbackEvent>
}

export function isLineMessageEvent(
    event: LineParameter['events'][0]
): event is LineMessageEvent {
    return (
        Object.prototype.hasOwnProperty.call(event, 'message') &&
        typeof (event as any).message === 'object'
    )
}
