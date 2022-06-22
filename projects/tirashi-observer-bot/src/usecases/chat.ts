import type { WordSheetRepository } from '../domains/word'
import type { WordActionMessage } from '../services/word-action-message'
import type { ScriptProperties } from '../domains/script-properties'
import type { ReplyMessages } from '../services/line-fetch'
import { InfrastructureError as _InfrastructureError } from '../error'

const InfrastructureError: typeof _InfrastructureError =
    typeof _InfrastructureError === 'undefined'
        ? exports.InfrastructureError
        : _InfrastructureError

export function chat(
    message: string,
    replyToken: string,
    fetch: ReplyMessages,
    wordSheet: WordSheetRepository,
    wordActionMessage: WordActionMessage,
    scriptProperties: ScriptProperties
): void {
    try {
        const [wordValue, wordActive] = wordSheet.get(message)
    } catch (error) {
        if (!(error instanceof InfrastructureError)) {
            throw error
        }

        if (error.getFrom() === 'WordDoesNotExist') {
            const lineToken = scriptProperties.getLineToken().get()
            const data = wordActionMessage.create(message, {
                exists: false,
                active: false
            })

            data.replyToken = replyToken

            fetch(JSON.stringify(data), lineToken)
        }
    }
}
