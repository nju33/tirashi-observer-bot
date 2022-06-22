import axios, { AxiosInstance } from 'axios'
import { LineMessage } from './line-message'

describe('LineMessage', () => {
    let instance: AxiosInstance

    beforeAll(() => {
        instance = axios.create({
            headers: {
                'Content-Type': 'application/json',
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                Authorization: `Bearer ${process.env.LINE_TOKEN!}`
            }
        })
    })

    it.skip('properly send a success message', async () => {
        const data = LineMessage.Success('Success')

        await instance.post(
            'https://api.line.me/v2/bot/message/broadcast',
            data
        )
    })

    it.skip('properly send a warning message', async () => {
        const data = LineMessage.Warning('Warning')

        await instance.post(
            'https://api.line.me/v2/bot/message/broadcast',
            data
        )
    })

    it.skip('properly send a error message', async () => {
        const data = LineMessage.Error('Error')

        await instance.post(
            'https://api.line.me/v2/bot/message/broadcast',
            data
        )
    })
})
