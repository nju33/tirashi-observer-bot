function doPost(
    doPostEvent: GoogleAppsScript.Events.DoPost
): GoogleAppsScript.Content.TextOutput {
    Logger.log(':doPost:')

    const parameter = JSON.parse(doPostEvent.postData.contents) as LineParameter
    Logger.log(parameter)

    const event = parameter.events[0]

    if (isLineMessageEvent(event)) {
        const message = event.message.text
        chat(
            message,
            event.replyToken,
            replyMessages,
            new WordSheet(),
            wordActionMessage,
            gasProperties
        )
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
