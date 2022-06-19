import type { JsonValue } from 'type-fest'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ToString = { toString: () => string }

function sliceWords(words: ToString[]): ToString[][] {
    const max = Math.ceil(words.length / 10)
    const result: ToString[][] = []

    let current = 0

    while (current < max) {
        const start = current * 10
        const end = start + 10

        result.push(words.slice(start, end))

        current++
    }

    return result
}

/**
 * Create line bubble component for list
 */
function createBubble(words: ToString[], isFirst: boolean): JsonValue {
    const header = isFirst
        ? {
              type: 'box',
              layout: 'horizontal',
              alignItems: 'center',
              height: '80px',
              contents: [
                  {
                      type: 'text',
                      size: 'sm',
                      color: '#666666',
                      text: 'ワードをタップ（クリック）すると再び有効、もしくは無効にできます。',
                      wrap: true
                  }
              ]
          }
        : {
              type: 'box',
              layout: 'horizontal',
              height: '80px',
              contents: []
          }

    return {
        type: 'bubble',
        header,
        body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            contents: [
                {
                    type: 'box',
                    layout: 'baseline',
                    backgroundColor: '#eeeeee',
                    paddingAll: 'lg',
                    action: {
                        type: 'postback',
                        label: 'Reactivate',
                        data: '{}',
                        displayText: 'Reactivate キャベツ'
                    },
                    spacing: 'md',
                    contents: [
                        {
                            type: 'icon',
                            url: 'https://tirashi-observer-bot.web.app/tinified/toggle-on.png',
                            size: '24px',
                            offsetTop: '3px'
                        },
                        {
                            type: 'text',
                            offsetTop: '-3px',
                            contents: [
                                {
                                    type: 'span',
                                    text: 'キャベツ',
                                    weight: 'bold'
                                }
                            ],
                            wrap: true
                        }
                    ]
                },
                {
                    type: 'box',
                    layout: 'baseline',
                    paddingAll: 'lg',
                    action: {
                        type: 'postback',
                        label: 'Reactivate',
                        data: '{}',
                        displayText: 'Reactivate キャベツ'
                    },
                    spacing: 'md',
                    contents: [
                        {
                            type: 'icon',
                            url: 'https://tirashi-observer-bot.web.app/tinified/toggle-off.png',
                            size: '24px',
                            offsetTop: '3px'
                        },
                        {
                            type: 'text',
                            offsetTop: '-3px',
                            contents: [
                                {
                                    type: 'span',
                                    text: 'キャベツ',
                                    weight: 'bold'
                                }
                            ],
                            wrap: true
                        }
                    ]
                },
                {
                    type: 'box',
                    layout: 'baseline',
                    backgroundColor: '#eeeeee',
                    paddingAll: 'lg',
                    action: {
                        type: 'postback',
                        label: 'Reactivate',
                        data: '{}',
                        displayText: 'Reactivate キャベツ'
                    },
                    spacing: 'md',
                    contents: [
                        {
                            type: 'icon',
                            url: 'https://tirashi-observer-bot.web.app/tinified/toggle-on.png',
                            size: '24px',
                            offsetTop: '3px'
                        },
                        {
                            type: 'text',
                            offsetTop: '-3px',
                            contents: [
                                {
                                    type: 'span',
                                    text: 'キャベツ',
                                    weight: 'bold'
                                }
                            ],
                            wrap: true
                        }
                    ]
                }
            ]
        }
    }
}

const ListLineMessage = Object.freeze({
    create(words: ToString[]) {
        const chunks = sliceWords(words)
    }
})
