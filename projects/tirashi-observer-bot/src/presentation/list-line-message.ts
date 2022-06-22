import type { JsonObject } from 'type-fest'
import type { ListLineMessage } from '../domains/list-line-message'
import { EVENT_TYPES as _EVENT_TYPES } from '../event'

const EVENT_TYPES: typeof _EVENT_TYPES =
    typeof _EVENT_TYPES === 'undefined' ? exports.EVENT_TYPES : _EVENT_TYPES

type CreateParameter = Parameters<ListLineMessage['create']>[0]
type CreateReturnType = ReturnType<ListLineMessage['create']>

function sliceWords<T>(words: T[]): T[][] {
    const max = Math.ceil(words.length / 10)
    const result: T[][] = []

    let current = 0

    while (current < max) {
        const start = current * 10
        const end = start + 10

        result.push(words.slice(start, end))

        current++
    }

    return result
}

function createLabel(word: CreateParameter[0]): string {
    if (word.active) {
        return '有効化'
    }

    return '無効化'
}

function createDisplayText(word: CreateParameter[0]): string {
    if (word.active) {
        return `${word.value}を有効にします。`
    }

    return `${word.value}を無効にします。`
}

function createData(word: CreateParameter[0]): string {
    const type = word.active
        ? EVENT_TYPES.inactivateWord
        : EVENT_TYPES.activateWord

    return JSON.stringify({ type, payload: { word } })
}

function createToggleIconContent(
    word: CreateParameter[0]
): JsonObject {
    const toggleIcon = word.active
        ? 'https://tirashi-observer-bot.web.app/tinified/toggle-on.png'
        : 'https://tirashi-observer-bot.web.app/tinified/toggle-off.png'

    return {
        type: 'icon',
        url: toggleIcon,
        size: '24px',
        offsetTop: '3px'
    }
}

function createLine(
    word: CreateParameter[0],
    isOdd: boolean
): CreateReturnType {
    const oddProperties = isOdd ? { backgroundColor: '#eeeeee' } : {}
    const action = {
        type: 'postback',
        label: createLabel(word),
        displayText: createDisplayText(word),
        data: createData(word)
    }
    const lineText = {
        type: 'text',
        offsetTop: '-3px',
        contents: [
            {
                type: 'span',
                text: word.value,
                weight: 'bold'
            }
        ],
        wrap: true
    }

    return {
        ...oddProperties,
        type: 'box',
        layout: 'baseline',
        paddingAll: 'lg',
        action,
        spacing: 'md',
        contents: [createToggleIconContent(word), lineText]
    }
}

/**
 * Create line bubble component for list
 */
function createBubble(
    words: CreateParameter,
    isFirst: boolean
): CreateReturnType {
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
    const contents = words.map((word, i) => {
        return createLine(word, (i + 1) % 2 > 0)
    })

    return {
        type: 'bubble',
        header,
        body: {
            type: 'box',
            layout: 'vertical',
            spacing: 'sm',
            contents
        }
    }
}

export class TobListLineMessage implements ListLineMessage {
    create(words: Parameters<ListLineMessage['create']>[0]): JsonObject {
        const chunks = sliceWords(words)
        const bubbles = chunks.map((chunk, i) => {
            const isFirst = i === 0

            return createBubble(chunk, isFirst)
        })

        return {
            messages: [
                {
                    type: 'flex',
                    altText: 'ワード一覧',
                    contents: {
                        type: 'carousel',
                        contents: bubbles
                    }
                }
            ]
        }
    }
}

