import axios, { AxiosInstance } from 'axios'
import rewire from 'rewire'

function createDummyWords(): Word[] {
    return [...Array(100)].map(() => {
        const randomValue = Math.random()

        return {
            value: Math.floor(randomValue * 1000).toString(),
            active: Boolean(Math.round(randomValue))
        }
    })
}

describe('ListLineMessage', () => {
    let instance: AxiosInstance
    let lineMessageModule: ReturnType<typeof rewire>

    beforeAll(() => {
        const eventModule = rewire(
            '../../../../out/projects/tirashi-observer-bot/src/event'
        )
        const eventTypes =
            eventModule.__get__<typeof EVENT_TYPES>('EVENT_TYPES')
        instance = axios.create({
            headers: {
                'Content-Type': 'application/json',
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                Authorization: `Bearer ${process.env.LINE_TOKEN!}`
            }
        })
        lineMessageModule = rewire(
            '../../../../out/projects/tirashi-observer-bot/src/presentation/list-line-message'
        )
        lineMessageModule.__set__('_EVENT_TYPES', eventTypes)
    })

    it.skip('properly send to list words message', async () => {
        const targetClass =
            lineMessageModule.__get__<typeof listLineMessage>('listLineMessage')

        const data = targetClass.create(createDummyWords())

        await instance.post(
            'https://api.line.me/v2/bot/message/broadcast',
            data
        )
    })
})
