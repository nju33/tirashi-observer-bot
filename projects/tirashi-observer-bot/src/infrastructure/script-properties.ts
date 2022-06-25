import type { Token } from '../domains/token'
import type {
    ScriptProperties,
    TobScriptPropertiesValueFactory
} from '../domains/script-properties'
import type { SeparatingStringByComma } from '../domains/tirashi-url'
import { InfrastructureError as _InfrastructureError } from '../error'
import { createFolderIdWhereFlyerDownloads as _createFolderIdWhereFlyerDownloads } from '../domains/folder-id-where-flyer-downloads'

const InfrastructureError: typeof _InfrastructureError =
    typeof _InfrastructureError === 'undefined'
        ? exports.InfrastructureError
        : _InfrastructureError
const createFolderIdWhereFlyerDownloads: typeof _createFolderIdWhereFlyerDownloads =
    typeof _createFolderIdWhereFlyerDownloads === 'undefined'
        ? exports.createFolderIdWhereFlyerDownloads
        : _createFolderIdWhereFlyerDownloads

export class TobScriptProperties implements ScriptProperties {
    static readonly KEYS = Object.freeze({
        LINE_TOKEN: 'LINE_TOKEN',
        TIRASHI_URL: 'TIRASHI_URL',
        FOLDER_ID_WHERE_FLYER_DOWNLOADS: 'FOLDER_ID_WHERE_FLYER_DOWNLOADS'
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

    getFolderIdWhereFlyerDownloads(): string {
        const key = TobScriptProperties.KEYS.FOLDER_ID_WHERE_FLYER_DOWNLOADS
        const scriptProperties = this.propertiesService.getScriptProperties()
        const value = scriptProperties.getProperty(key)

        return this.tobScriptPropertiesValueFactory.createFolderIdWhereFlyerDownloads(
            value
        )
    }
}

export type TobScriptPropertisesConstructor = new (
    ...args: ConstructorParameters<typeof TobScriptProperties>
) => TobScriptProperties
