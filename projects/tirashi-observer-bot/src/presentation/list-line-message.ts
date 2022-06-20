type CreateParameter = Parameters<ListLineMessage['create']>[0]
type CreateReturnType = ReturnType<ListLineMessage['create']>

// To also access EVENT_TYPES in tests
let _EVENT_TYPES: typeof EVENT_TYPES | undefined
if (typeof EVENT_TYPES !== 'undefined') {
    _EVENT_TYPES = EVENT_TYPES
}

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
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const type = word.active
        ? _EVENT_TYPES!.inactivateWord
        : _EVENT_TYPES!.activateWord
    /* eslint-enable @typescript-eslint/no-non-null-assertion */

    return JSON.stringify({ type, payload: { word } })
}

function createToggleIconContent(
    word: CreateParameter[0]
): import('type-fest').JsonObject {
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

const listLineMessage: ListLineMessage = {
    create(
        words: Parameters<ListLineMessage['create']>[0]
    ): import('type-fest').JsonObject {
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
