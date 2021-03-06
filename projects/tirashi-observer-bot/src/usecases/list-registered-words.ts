import { TobWord as _TobWord } from '../domains/word'
import type { WordSheetRepository } from '../domains/word'
import type { ScriptProperties } from '../domains/script-properties'
import type { ReplyMessages } from '../services/line-fetch'
import type { ListLineMessage } from '../domains/list-line-message'
import type { LineMessage } from '../services/line-message'

const TobWord: typeof _TobWord =
    typeof _TobWord === 'undefined' ? exports.TobWord : _TobWord

export function listRegisteredWords({
    replyToken,
    userId,

    wordSheetRepository,
    fetch,
    scriptProperties,

    lineMessage,
    listLineMessage
}: {
    replyToken: string
    userId: string

    wordSheetRepository: WordSheetRepository
    fetch: ReplyMessages
    scriptProperties: ScriptProperties

    lineMessage: LineMessage
    listLineMessage: ListLineMessage
}): void {
    const lineToken = scriptProperties.getLineToken().get()
    const wordSheetValues = wordSheetRepository.getAll(userId)

    if (wordSheetValues.length === 0) {
        const data = lineMessage.createWarning(
            '登録されている言葉が１件もありません。'
        )
        data.replyToken = replyToken

        fetch(JSON.stringify(data), lineToken)
        return
    }

    const words = wordSheetValues.map((sheetValue) =>
        TobWord.reconstruct(sheetValue[0], sheetValue[1], sheetValue[2])
    )

    const data = listLineMessage.create(words)
    data.replyToken = replyToken

    fetch(JSON.stringify(data), lineToken)
}
