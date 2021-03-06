import { ChatQucikReplyTexts as _ChatQucikReplyText } from '../domains/chat'
import { TobWord as _TobWord } from '../domains/word'
import type { WordSheetRepository } from '../domains/word'
import type { ScriptProperties } from '../domains/script-properties'
import type { ReplyMessages } from '../services/line-fetch'
import type { LineMessage } from '../services/line-message'

const ChatQucikReplyTexts: typeof _ChatQucikReplyText =
    typeof _ChatQucikReplyText === 'undefined'
        ? exports.ChatQucikReplyTexts
        : _ChatQucikReplyText
const TobWord: typeof _TobWord =
    typeof _TobWord === 'undefined' ? exports.TobWord : _TobWord

export function deleteRegisteredWord({
    wordValue,
    userId,
    replyToken,

    wordSheetRepository,
    fetch,
    scriptProperties,

    lineMessage
}: {
    wordValue: string
    userId: string
    replyToken: string

    wordSheetRepository: WordSheetRepository
    fetch: ReplyMessages
    scriptProperties: ScriptProperties

    lineMessage: LineMessage
}): void {
    const word = new TobWord(wordValue, userId)
    const lineToken = scriptProperties.getLineToken().get()
    wordSheetRepository.delete(word)

    const data = lineMessage.createSuccess(
        `${ChatQucikReplyTexts.Delete(wordValue)}しました！`
    )
    data.replyToken = replyToken

    fetch(JSON.stringify(data), lineToken)
}
