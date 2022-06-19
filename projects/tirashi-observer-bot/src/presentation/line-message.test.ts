import axios, { AxiosInstance } from 'axios'
import rewire from 'rewire'

describe('LineMessage', () => {
    let instance: AxiosInstance
    let lineMessageModule: ReturnType<typeof rewire>

    beforeAll(() => {
        instance = axios.create({
            baseURL: 'https://api.line.me/v2/bot/message/broadcast',
            headers: {
                'Content-Type': 'application/json',
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                Authorization: `Bearer ${process.env.LINE_TOKEN!}`
            }
        })

        lineMessageModule = rewire(
            '../../../../out/projects/tirashi-observer-bot/src/presentation/line-message'
        )
    })

    it.skip('properly send a success message', async () => {
        const targetClass =
            lineMessageModule.__get__<typeof LineMessage>('LineMessage')

        const data = targetClass.Success('Success')

        await instance.post(
            'https://api.line.me/v2/bot/message/broadcast',
            data
        )
    })

    it.skip('properly send a warning message', async () => {
        const targetClass =
            lineMessageModule.__get__<typeof LineMessage>('LineMessage')

        const data = targetClass.Warning('Warning')

        await instance.post(
            'https://api.line.me/v2/bot/message/broadcast',
            data
        )
    })

    it.skip('properly send a error message', async () => {
        const targetClass =
            lineMessageModule.__get__<typeof LineMessage>('LineMessage')

        const data = targetClass.Error('Error')

        await instance.post(
            'https://api.line.me/v2/bot/message/broadcast',
            data
        )
    })
})
