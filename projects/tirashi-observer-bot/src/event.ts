import type { Word } from './domains/word'

export const EVENT_TYPES = Object.freeze({
    chat: 'chat',
    registerWord: 'registerWord',
    listRegisteredWords: 'listRegisteredWords',
    deleteRegisteredWords: 'deleteRegisteredWords',
    activateWord: 'activateWord',
    inactivateWord: 'inactivateWord'
} as const)

export interface ChatEventParameter {
    type: typeof EVENT_TYPES.chat
    payload: { message: string; replyToken: string }
}

export interface RegisterWordEventParameter {
    type: typeof EVENT_TYPES.registerWord
    payload: { message: string; replyToken: string }
}

export interface ListRegisteredWordsEventParameters {
    type: typeof EVENT_TYPES.listRegisteredWords
    payload: { replyToken: string }
}

export interface DeleteRegisteredWords {
    type: typeof EVENT_TYPES.deleteRegisteredWords
    payload: { message: string; replyToken: string }
}

export interface ActivateWordEventParameter {
    type: typeof EVENT_TYPES.activateWord
    payload: { word: Word; replyToken: string }
}

export interface InctivateWordEventParameter {
    type: typeof EVENT_TYPES.activateWord
    payload: { word: Word; replyToken: string }
}

export type EventParameter = RegisterWordEventParameter &
    ActivateWordEventParameter &
    InctivateWordEventParameter
