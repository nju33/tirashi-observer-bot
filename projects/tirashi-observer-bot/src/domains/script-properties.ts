import type { Token } from './token'
import type { SeparatingStringByComma } from './tirashi-url'
import { LineToken as _LineToken } from './line'
import { TirashiUrl as _TirashiUrl } from './tirashi-url'

const LineToken: typeof _LineToken =
    typeof _LineToken === 'undefined' ? exports.LineToken : _LineToken
const TirashiUrl: typeof _TirashiUrl =
    typeof _TirashiUrl === 'undefined' ? exports.TirashiUrl : _TirashiUrl

export interface ScriptProperties {
    getLineToken: () => Token
    getTirashiUrl: () => SeparatingStringByComma
}

export interface TobScriptPropertiesValueFactory {
    createLineToken: (value: string) => Token
    createTirashiUrl: (value: string) => SeparatingStringByComma
}

export const tobScriptPropertiesValueFactory: Readonly<TobScriptPropertiesValueFactory> =
    Object.freeze({
        createLineToken: (value: string) => new LineToken(value),
        createTirashiUrl: (value: string) => new TirashiUrl(value)
    })
