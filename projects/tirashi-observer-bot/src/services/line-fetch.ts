/**
 * https://developers.line.biz/en/reference/messaging-api/#send-reply-message
 */
export type ReplyMessages = (data: string, bearerToken: string) => string

/**
 * https://developers.line.biz/en/reference/messaging-api/#send-push-message
 */
export type PushMessages = (data: string, bearerToken: string) => string
