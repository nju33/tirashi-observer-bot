function registerWords(
    { message }: RegisterWordEventParameter['payload'],
    fetch: typeof fetchText,
    wordSheet: WordRepository,
    lineMessage: typeof LineMessage
): void {
    const word = constructWord(message)

    // if (wordSheet.has(word)) {
    //     const data = lineMessage.Warning(`「${word.value}」は既に登録済みです`)

    //     fetch('url', {
    //         method: 'get',
    //         headers: { 'content-type': 'application/json' },
    //         data: JSON.stringify(data)
    //     })

    //     return
    // }

    // wordSheet.insert(word)
}
