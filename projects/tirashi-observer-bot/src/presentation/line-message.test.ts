import axios, { AxiosInstance } from 'axios'
import { lineMessage } from './line-message'

describe('LineMessage', () => {
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

    it.skip('properly send a success message', async () => {
        const data = lineMessage.createSuccess('Success')

        await instance.post(
            'https://api.line.me/v2/bot/message/broadcast',
            data
        )
    })

    it.skip('properly send a warning message', async () => {
        const data = lineMessage.createWarning('Warning')

        await instance.post(
            'https://api.line.me/v2/bot/message/broadcast',
            data
        )
    })

    it.skip('properly send a error message', async () => {
        const data = lineMessage.createError('Error')

        await instance.post(
            'https://api.line.me/v2/bot/message/broadcast',
            data
        )
    })
})
