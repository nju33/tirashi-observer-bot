import { TobScriptProperties } from './script-properties'
import { tobScriptPropertiesValueFactory } from '../domains/script-properties'

describe('TobScriptProperties', () => {
    let propertiesService: GoogleAppsScript.Properties.PropertiesService
    let mockingGetProperty: jest.Mock<string, any[]>

    beforeAll(() => {
        mockingGetProperty = jest.fn()
        propertiesService = {
            getScriptProperties: jest.fn().mockReturnValue({
                getProperty: mockingGetProperty
            })
        } as unknown as GoogleAppsScript.Properties.PropertiesService
    })

    it('should get the line token', () => {
        const expected = 'foo'
        mockingGetProperty.mockReturnValueOnce(expected)

        const properties = new TobScriptProperties(
            tobScriptPropertiesValueFactory,
            propertiesService
        )

        const lineToken = properties.getLineToken().get()

        expect(lineToken).toBe(expected)
    })

    it('should get the tirashi url', () => {
        const expected = [
            'https://....xyz',
            'https://....com',
            'https://....guru'
        ]
        mockingGetProperty.mockReturnValueOnce(expected.join(','))

        const properties = new TobScriptProperties(
            tobScriptPropertiesValueFactory,
            propertiesService
        )

        const tirashiUrl = properties.getTirashiUrl().get()

        expect(tirashiUrl).toEqual(expected)
    })

    it('should get the folder id', () => {
        const expected = 'asdf'
        mockingGetProperty.mockReturnValueOnce(expected)

        const properties = new TobScriptProperties(
            tobScriptPropertiesValueFactory,
            propertiesService
        )

        const folderId = properties.getFolderIdWhereFlyerDownloads()

        expect(folderId).toEqual(expected)
    })

    it('should get the `root`', () => {
        const properties = new TobScriptProperties(
            tobScriptPropertiesValueFactory,
            propertiesService
        )

        const folderId = properties.getFolderIdWhereFlyerDownloads()

        expect(folderId).toEqual('root')
    })
})
