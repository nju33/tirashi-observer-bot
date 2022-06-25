import type { JsonObject } from 'type-fest'
import type { WordsMatchedMessage } from '../services/words-matched-message'

export class TobWordsMatchedMessage implements WordsMatchedMessage {
    create({
        title,
        imageUrl,
        matchedWords
    }: {
        title: string
        imageUrl: string
        matchedWords: string[]
    }): JsonObject {
        const header = this.createHeader(title)
        const hero = this.createHero(imageUrl)
        const body = this.createBody(matchedWords)

        return {
            messages: [
                {
                    type: 'flex',
                    altText: title,
                    contents: {
                        type: 'bubble',
                        styles: {
                            hero: hero.style
                        },
                        header: header.body,
                        hero: hero.body,
                        body: body.body
                    }
                }
            ]
        }
    }

    private createHeader(title: string): {
        style: JsonObject
        body: JsonObject
    } {
        return {
            style: {},
            body: {
                type: 'box',
                layout: 'vertical',
                contents: [
                    {
                        type: 'text',
                        text: title,
                        weight: 'bold',
                        wrap: true
                    }
                ]
            }
        }
    }

    private createHero(imageUrl: string): {
        style: JsonObject
        body: JsonObject
    } {
        return {
            style: {
                backgroundColor: '#333333'
            },
            body: {
                type: 'box',
                layout: 'vertical',
                paddingAll: 'md',
                contents: [
                    {
                        type: 'image',
                        size: 'full',
                        url: imageUrl,
                        aspectRatio: '1.51:1',
                        action: {
                            type: 'uri',
                            label: 'チラシを見る',
                            uri: imageUrl
                        }
                    }
                ]
            }
        }
    }

    private createBody(matchedWords: string[]): {
        style: JsonObject
        body: JsonObject
    } {
        return {
            style: {},
            body: {
                type: 'box',
                layout: 'vertical',
                contents: matchedWords.map((word) => {
                    return {
                        type: 'text',
                        contents: [
                            {
                                type: 'span',
                                text: '-'
                            },
                            {
                                type: 'span',
                                text: '　'
                            },
                            {
                                type: 'span',
                                text: word,
                                weight: 'bold'
                            }
                        ]
                    }
                })
            }
        }
    }
}
