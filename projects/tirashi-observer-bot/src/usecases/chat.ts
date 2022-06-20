function chat(
    message: string,
    replyToken: string,
    fetch: typeof replyMessages,
    wordSheet: WordRepository,
    wordActionMessage: WordActionMessage,
    gasProperties: GasProperties
): void {
    try {
        const [wordValue, wordActive] = wordSheet.get(message)
    } catch (error) {
        if (!(error instanceof InfrastructureError)) {
            throw error
        }

        if (error.getFrom() === 'WordDoesNotExist') {
            const data = wordActionMessage.create(message, {
                exists: false,
                active: false
            })

            data.replyToken = replyToken

            fetch(JSON.stringify(data), gasProperties.get('LINE_TOKEN'))
        }
    }
}
