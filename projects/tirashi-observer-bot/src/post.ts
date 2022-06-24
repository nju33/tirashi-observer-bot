import type { LineParameter } from './line'
import { isLineMessageEvent as _isLineMessageEvent } from './line'
import { TobScriptProperties as _TobScriptProperties } from './infrastructure/script-properties'
import { tobScriptPropertiesValueFactory as _tobScriptPropertiesValueFactory } from './domains/script-properties'
import { TobWordSheetRepository as _TobWordSheetRepository } from './infrastructure/word-sheet'
import { lineMessage as _lineMessage } from './presentation/line-message'
import { chatActionReplyMessage as _chatActionReplyMessage } from './presentation/chat-action-reply-message'
import { TobListLineMessage as _TobListLineMessage } from './presentation/list-line-message'
import {
    matchCreateQuickReplyOfChat as _matchCreateQuickReplyOfChat,
    matchActivateQuickReplyOfChat as _matchActivateQuickReplyOfChat,
    matchInactivateQuickReplyOfChat as _matchInactivateQuickReplyOfChat,
    matchDeleteQuickReplyOfChat as _matchDeleteQuickReplyOfChat
} from './services/chat-action-reply-message'
import { replyMessages as _replyMessages } from './infrastructure/line-fetch'
import { chat as _chat } from './usecases/chat'
import { registerWord as _registerWord } from './usecases/register-word'
import { deleteRegisteredWord as _deleteRegisteredWord } from './usecases/delete-registered-word'
import { listRegisteredWords as _listRegisteredWords } from './usecases/list-registered-words'
import { activateRegisteredWord as _activateRegisteredWord } from './usecases/activate-registered-word'
import { inactivateRegisteredWord as _inactivateRegisteredWord } from './usecases/inactivate-registered-word'

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
const lineMessage: typeof _lineMessage =
    typeof _lineMessage === 'undefined' ? exports.lineMessage : _lineMessage
const chatActionReplyMessage: typeof _chatActionReplyMessage =
    typeof _chatActionReplyMessage === 'undefined'
        ? exports.chatActionReplyMessage
        : _chatActionReplyMessage
const TobListLineMessage: typeof _TobListLineMessage =
    typeof _TobListLineMessage === 'undefined'
        ? exports.TobListLineMessage
        : _TobListLineMessage
const matchCreateQuickReplyOfChat: typeof _matchCreateQuickReplyOfChat =
    typeof _matchCreateQuickReplyOfChat === 'undefined'
        ? exports.matchCreateQuickReplyOfChat
        : _matchCreateQuickReplyOfChat
const matchActivateQuickReplyOfChat: typeof _matchActivateQuickReplyOfChat =
    typeof _matchActivateQuickReplyOfChat === 'undefined'
        ? exports.matchActivateQuickReplyOfChat
        : _matchActivateQuickReplyOfChat
const matchInactivateQuickReplyOfChat: typeof _matchInactivateQuickReplyOfChat =
    typeof _matchInactivateQuickReplyOfChat === 'undefined'
        ? exports.matchInactivateQuickReplyOfChat
        : _matchInactivateQuickReplyOfChat
const matchDeleteQuickReplyOfChat: typeof _matchDeleteQuickReplyOfChat =
    typeof _matchDeleteQuickReplyOfChat === 'undefined'
        ? exports.matchDeleteQuickReplyOfChat
        : _matchDeleteQuickReplyOfChat
const replyMessages: typeof _replyMessages =
    typeof _replyMessages === 'undefined'
        ? exports.replyMessages
        : _replyMessages
const chat: typeof _chat = typeof _chat === 'undefined' ? exports.chat : _chat
const registerWord: typeof _registerWord =
    typeof _registerWord === 'undefined' ? exports.registerWord : _registerWord
const deleteRegisteredWord: typeof _deleteRegisteredWord =
    typeof _deleteRegisteredWord === 'undefined'
        ? exports.deleteRegisteredWord
        : _deleteRegisteredWord
const listRegisteredWords: typeof _listRegisteredWords =
    typeof _listRegisteredWords === 'undefined'
        ? exports.listRegisteredWords
        : _listRegisteredWords
const activateRegisteredWord: typeof _activateRegisteredWord =
    typeof _activateRegisteredWord === 'undefined'
        ? exports.activateRegisteredWord
        : _activateRegisteredWord
const inactivateRegisteredWord: typeof _inactivateRegisteredWord =
    typeof _inactivateRegisteredWord === 'undefined'
        ? exports.inactivateRegisteredWord
        : _inactivateRegisteredWord

function ok(): GoogleAppsScript.Content.TextOutput {
    return ContentService.createTextOutput('ok')
}

export function doPost(
    doPostEvent: GoogleAppsScript.Events.DoPost
): GoogleAppsScript.Content.TextOutput {
    Logger.log(':doPost:')
    const parameter = JSON.parse(doPostEvent.postData.contents) as LineParameter
    Logger.log(parameter)

    const event = parameter.events[0]

    if (isLineMessageEvent(event)) {
        const message = event.message.text
        const userId = event.source.userId
        const replyToken = event.replyToken
        const wordSheetRepository = new TobWordSheetRepository(SpreadsheetApp)
        const scriptProperties = new TobScriptProperties(
            tobScriptPropertiesValueFactory,
            PropertiesService
        )

        if (/^一覧/.test(message)) {
            const listLineMessage = new TobListLineMessage()
            listRegisteredWords({
                replyToken,
                userId,
                wordSheetRepository,
                scriptProperties,
                lineMessage,
                listLineMessage,
                fetch: replyMessages
            })
            return ok()
        }

        const matchedCreateQuickReplyOfChat =
            matchCreateQuickReplyOfChat(message)
        const matchedActivateQuickReplyOfChat =
            matchActivateQuickReplyOfChat(message)
        const matchedInactivateQuickReplyOfChat =
            matchInactivateQuickReplyOfChat(message)
        const matchedDeleteQuickReplyOfChat =
            matchDeleteQuickReplyOfChat(message)

        if (matchedCreateQuickReplyOfChat != null) {
            registerWord({
                wordValue: matchedCreateQuickReplyOfChat,
                userId,
                replyToken,
                lineMessage,
                wordSheetRepository,
                scriptProperties,
                fetch: replyMessages
            })
            return ok()
        } else if (matchedActivateQuickReplyOfChat != null) {
            activateRegisteredWord({
                wordValue: matchedActivateQuickReplyOfChat,
                userId,
                replyToken,
                lineMessage,
                wordSheetRepository,
                scriptProperties,
                fetch: replyMessages
            })
            return ok()
        } else if (matchedInactivateQuickReplyOfChat != null) {
            inactivateRegisteredWord({
                wordValue: matchedInactivateQuickReplyOfChat,
                userId,
                replyToken,
                lineMessage,
                wordSheetRepository,
                scriptProperties,
                fetch: replyMessages
            })
            return ok()
        } else if (matchedDeleteQuickReplyOfChat != null) {
            deleteRegisteredWord({
                wordValue: matchedDeleteQuickReplyOfChat,
                userId,
                replyToken,
                lineMessage,
                wordSheetRepository,
                scriptProperties,
                fetch: replyMessages
            })
            return ok()
        }

        try {
            chat({
                message,
                userId,
                replyToken,
                chatActionReplyMessage,
                scriptProperties,
                wordSheetRepository,
                fetch: replyMessages
            })

            return ok()
        } catch (error) {
            return ContentService.createTextOutput(
                `error: ${(error as Error).message}`
            )
        }
    }

    return ok()
}
