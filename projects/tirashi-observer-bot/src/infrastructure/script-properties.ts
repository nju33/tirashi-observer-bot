import type { Token } from '../domains/token'
import type {
    ScriptProperties,
    TobScriptPropertiesValueFactory
} from '../domains/script-properties'
import type { SeparatingStringByComma } from '../domains/tirashi-url'
import { InfrastructureError as _InfrastructureError } from '../error'

const InfrastructureError: typeof _InfrastructureError =
    typeof _InfrastructureError === 'undefined'
        ? exports.InfrastructureError
        : _InfrastructureError

export class TobScriptProperties implements ScriptProperties {
    static readonly KEYS = Object.freeze({
        LINE_TOKEN: 'LINE_TOKEN',
        TIRASHI_URL: 'TIRASHI_URL'
    })

    constructor(
        private readonly tobScriptPropertiesValueFactory: TobScriptPropertiesValueFactory,
        private readonly propertiesService: GoogleAppsScript.Properties.PropertiesService
    ) {}

    getLineToken(): Token {
        const key = TobScriptProperties.KEYS.LINE_TOKEN
        const scriptProperties = this.propertiesService.getScriptProperties()
        const value = scriptProperties.getProperty(
            TobScriptProperties.KEYS.LINE_TOKEN
        )

        if (value == null) {
            throw InfrastructureError.ScriptPropertyDoesNotExist(key)
        }

        return this.tobScriptPropertiesValueFactory.createLineToken(value)
    }

    getTirashiUrl(): SeparatingStringByComma {
        const key = TobScriptProperties.KEYS.TIRASHI_URL
        const scriptProperties = this.propertiesService.getScriptProperties()
        const value = scriptProperties.getProperty(key)

        if (value == null) {
            throw InfrastructureError.ScriptPropertyDoesNotExist(key)
        }

        return this.tobScriptPropertiesValueFactory.createTirashiUrl(value)
    }
}

export type TobScriptPropertisesConstructor = new (
    ...args: ConstructorParameters<typeof TobScriptProperties>
) => TobScriptProperties
