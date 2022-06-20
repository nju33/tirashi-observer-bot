const EVENT_TYPES = Object.freeze({
    chat: 'chat',
    registerWord: 'registerWord',
    listRegisteredWords: 'listRegisteredWords',
    deleteRegisteredWords: 'deleteRegisteredWords',
    activateWord: 'activateWord',
    inactivateWord: 'inactivateWord'
} as const)

interface ChatEventParameter {
    type: typeof EVENT_TYPES.chat
    payload: { message: string; replyToken: string }
}

interface RegisterWordEventParameter {
    type: typeof EVENT_TYPES.registerWord
    payload: { message: string; replyToken: string }
}

interface ListRegisteredWordsEventParameters {
    type: typeof EVENT_TYPES.listRegisteredWords
    payload: { replyToken: string }
}

interface DeleteRegisteredWords {
    type: typeof EVENT_TYPES.deleteRegisteredWords
    payload: { message: string; replyToken: string }
}

interface ActivateWordEventParameter {
    type: typeof EVENT_TYPES.activateWord
    payload: { word: Word; replyToken: string }
}

interface InctivateWordEventParameter {
    type: typeof EVENT_TYPES.activateWord
    payload: { word: Word; replyToken: string }
}

type EventParameter = RegisterWordEventParameter &
    ActivateWordEventParameter &
    InctivateWordEventParameter
