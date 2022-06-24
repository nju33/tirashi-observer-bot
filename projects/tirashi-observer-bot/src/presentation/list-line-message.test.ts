import axios, { AxiosInstance } from 'axios'
import { TobWord } from '../domains/word'
import { TobListLineMessage } from './list-line-message'

function createDummyWords(): TobWord[] {
    // When tried to request with 100 TobWords, its response was 400 with the mssage "flex too long"
    // So set a little less.
    return [...Array(80)].map(() => {
        const randomValue = Math.random()

        return TobWord.reconstruct(
            Math.floor(randomValue * 1000).toString(),
            'userId',
            Boolean(Math.round(randomValue))
        )
    })
}

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

    it.skip('properly send to list words message', async () => {
        const listLineMessage = new TobListLineMessage()

        const data = listLineMessage.create(createDummyWords())
        console.log(JSON.stringify(data))

        await instance.post(
            'https://api.line.me/v2/bot/message/broadcast',
            data
        )
    })
})
