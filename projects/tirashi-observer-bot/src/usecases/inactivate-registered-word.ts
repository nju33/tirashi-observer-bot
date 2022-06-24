import { ChatQucikReplyTexts as _ChatQucikReplyText } from '../domains/chat'
import { TobWord as _TobWord } from '../domains/word'
import type { WordSheetRepository, WordSheetValue } from '../domains/word'
import type { ScriptProperties } from '../domains/script-properties'
import type { ReplyMessages } from '../services/line-fetch'
import type { LineMessage } from '../services/line-message'

const ChatQucikReplyTexts: typeof _ChatQucikReplyText =
    typeof _ChatQucikReplyText === 'undefined'
        ? exports.ChatQucikReplyTexts
        : _ChatQucikReplyText
const TobWord: typeof _TobWord =
    typeof _TobWord === 'undefined' ? exports.TobWord : _TobWord

export function inactivateRegisteredWord({
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
    const lineToken = scriptProperties.getLineToken().get()
    let wordSheetValue: WordSheetValue

    try {
        wordSheetValue = wordSheetRepository.get(wordValue, userId)
    } catch {
        const data = lineMessage.createWarning(
            `「${wordValue}」はまだ登録されていません。`
        )
        data.replyToken = replyToken

        fetch(JSON.stringify(data), lineToken)
        return
    }

    const activatingWord = TobWord.reconstruct(
        wordSheetValue[0],
        userId,
        !wordSheetValue[2]
    )

    wordSheetRepository.update(activatingWord)

    const data = lineMessage.createSuccess(
        `${ChatQucikReplyTexts.Inactivate(wordValue)}しました！`
    )
    data.replyToken = replyToken

    fetch(JSON.stringify(data), lineToken)
}
