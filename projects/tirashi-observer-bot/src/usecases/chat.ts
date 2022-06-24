import type { WordSheetRepository } from '../domains/word'
import type { ScriptProperties } from '../domains/script-properties'
import type { ReplyMessages } from '../services/line-fetch'
import type { ChatActionReplyMessage } from '../services/chat-action-reply-message'
import { InfrastructureError as _InfrastructureError } from '../error'

const InfrastructureError: typeof _InfrastructureError =
    typeof _InfrastructureError === 'undefined'
        ? exports.InfrastructureError
        : _InfrastructureError

export function chat({
    message,
    userId,
    replyToken,

    fetch,
    wordSheetRepository,
    scriptProperties,

    chatActionReplyMessage
}: {
    message: string
    userId: string
    replyToken: string

    fetch: ReplyMessages
    wordSheetRepository: WordSheetRepository
    scriptProperties: ScriptProperties

    chatActionReplyMessage: ChatActionReplyMessage
}): void {
    const lineToken = scriptProperties.getLineToken().get()
    let wordActive: boolean

    try {
        const wordSheetValue = wordSheetRepository.get(message, userId)
        wordActive = wordSheetValue[2]
    } catch (error) {
        if (!(error instanceof InfrastructureError)) {
            throw error
        }

        if (error.getFrom() === 'WordDoesNotExist') {
            const data = chatActionReplyMessage.create(message, {
                exists: false,
                active: false
            })
            data.replyToken = replyToken

            fetch(JSON.stringify(data), lineToken)
        }

        return
    }

    const data = chatActionReplyMessage.create(message, {
        exists: true,
        active: wordActive
    })
    data.replyToken = replyToken

    fetch(JSON.stringify(data), lineToken)
}
