import type { LineMessage } from '../services/line-message'

export const lineMessage: LineMessage = Object.freeze({
    build(iconUrl: string, message: string) {
        return {
            messages: [
                {
                    type: 'flex',
                    altText: message,
                    contents: {
                        type: 'bubble',
                        body: {
                            type: 'box',
                            layout: 'vertical',
                            contents: [
                                {
                                    type: 'box',
                                    layout: 'vertical',
                                    height: '80px',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    contents: [
                                        {
                                            type: 'box',
                                            layout: 'baseline',
                                            contents: [
                                                {
                                                    type: 'icon',
                                                    url: iconUrl,
                                                    size: '55px'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    type: 'box',
                                    layout: 'vertical',
                                    alignItems: 'center',
                                    paddingAll: 'sm',
                                    contents: [
                                        {
                                            type: 'text',
                                            text: message,
                                            wrap: true
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            ]
        }
    },
    createSuccess(message: string) {
        return this.build(
            'https://tirashi-observer-bot.web.app/tinified/circle-check.png',
            message
        )
    },
    createWarning(message: string) {
        return this.build(
            'https://tirashi-observer-bot.web.app/tinified/circle-exclamation.png',
            message
        )
    },
    createError(message: string) {
        return this.build(
            'https://tirashi-observer-bot.web.app/tinified/circle-x.png',
            message
        )
    }
})
