import type { LineParameter } from './line'
import { isLineMessageEvent as _isLineMessageEvent } from './line'
import { TobScriptProperties as _TobScriptProperties } from './infrastructure/script-properties'
import { tobScriptPropertiesValueFactory as _tobScriptPropertiesValueFactory } from './domains/script-properties'
import { TobWordSheetRepository as _TobWordSheetRepository } from './infrastructure/word-sheet'
import { wordActionMessage as _wordActionMessage } from './presentation/word-action-message'
import { replyMessages as _replyMessages } from './infrastructure/line-fetch'
import { chat as _chat } from './usecases/chat'

const isLineMessageEvent: typeof _isLineMessageEvent =
    typeof _isLineMessageEvent === 'undefined'
        ? exports.isLineMessageEvent
        : _isLineMessageEvent
const TobScriptProperties: typeof _TobScriptProperties =
    typeof _TobScriptProperties === 'undefined'
        ? exports.TobScriptProperties
        : _TobScriptProperties
const tobScriptPropertiesValueFactory: typeof _tobScriptPropertiesValueFactory =
    typeof _tobScriptPropertiesValueFactory === 'undefined'
        ? exports.tobScriptPropertiesValueFactory
        : _tobScriptPropertiesValueFactory
const TobWordSheetRepository: typeof _TobWordSheetRepository =
    typeof _TobWordSheetRepository === 'undefined'
        ? exports.TobWordSheetRepository
        : _TobWordSheetRepository
const wordActionMessage: typeof _wordActionMessage =
    typeof _wordActionMessage === 'undefined'
        ? exports.wordActionMessage
        : _wordActionMessage
const replyMessages: typeof _replyMessages =
    typeof _replyMessages === 'undefined'
        ? exports.replyMessages
        : _replyMessages
const chat: typeof _chat = typeof _chat === 'undefined' ? exports.chat : _chat

export function doPost(
    doPostEvent: GoogleAppsScript.Events.DoPost
): GoogleAppsScript.Content.TextOutput {
    Logger.log(':doPost:')

    const parameter = JSON.parse(doPostEvent.postData.contents) as LineParameter
    Logger.log(parameter)

    const event = parameter.events[0]

    if (isLineMessageEvent(event)) {
        const message = event.message.text
        const scriptProperties = new TobScriptProperties(
            tobScriptPropertiesValueFactory,
            PropertiesService
        )

        try {
            chat(
                message,
                event.replyToken,
                replyMessages,
                new TobWordSheetRepository(SpreadsheetApp),
                wordActionMessage,
                scriptProperties
            )
        } catch (error) {
            return ContentService.createTextOutput(
                `error: ${(error as Error).message}`
            )
        }
    }

    // if (parameter.type === EVENT_TYPES.activateWord) {
    //     console.log('foo')
    //     return
    // }

    // if (parameter.type === EVENT_TYPES.inactivateWord) {
    //     console.log('foo')
    //     return
    // }

    // return

    return ContentService.createTextOutput('ok')
}
