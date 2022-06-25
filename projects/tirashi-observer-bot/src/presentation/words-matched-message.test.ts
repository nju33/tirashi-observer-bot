import axios, { AxiosInstance } from 'axios'
import { TobWordsMatchedMessage } from './words-matched-message'

describe('ListLineMessage', () => {
    let instance: AxiosInstance

    beforeAll(() => {
        instance = axios.create({
            headers: {
                'Content-Type': 'application/json',
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-non-null-assertion
                Authorization: `Bearer ${process.env.LINE_TOKEN!}`
            }
        })
    })

    it.skip('properly send a message', async () => {
        const wordsMatchMessage = new TobWordsMatchedMessage()

        const data = wordsMatchMessage.create({
            title: 'タイトル',
            imageUrl: 'https://dsc.cloud/acd2c9/fixture.jpeg',
            matchedWords: ['foo', 'bar', 'baz']
        })

        await instance.post(
            'https://api.line.me/v2/bot/message/broadcast',
            data
        )
    })
})
