import { TobWordSheetRepository } from './word-sheet'
import { TobWord } from '../domains/word'

describe('WordSheet#get', () => {
    it('should throw an error when the sheet does not exist', () => {
        const mockedSpreadsheetApp = {
            getActive: jest.fn().mockReturnValue({
                getSheetByName: jest.fn().mockReturnValue(null)
            })
        }

        const wordSheet = new TobWordSheetRepository(mockedSpreadsheetApp)

        expect(() => wordSheet.get('foo')).toThrow()
    })

    it('should throw an error when the word does not exist', () => {
        const mockedSheet = {
            createTextFinder: jest.fn().mockReturnValue({
                findNext: jest.fn().mockReturnValue(null)
            })
        }
        const mockedSpreadsheetApp = {
            getActive: jest.fn().mockReturnValue({
                getSheetByName: jest.fn().mockReturnValue(mockedSheet)
            })
        }
        const searchingWord = 'foo'

        const wordSheet = new TobWordSheetRepository(mockedSpreadsheetApp)

        expect(() => wordSheet.get(searchingWord)).toThrow()
        expect(mockedSheet.createTextFinder).toBeCalledWith(searchingWord)
    })

    it('should call Range#getValues', () => {
        const getValues = jest.fn().mockReturnValue([['foo', true]])
        const mockedSheet = {
            createTextFinder: jest.fn().mockReturnValue({
                findNext: jest.fn().mockReturnValue({
                    getRow: jest.fn().mockReturnValue(1)
                })
            }),
            getRange: jest.fn().mockReturnValue({
                getValues
            })
        }
        const mockedSpreadsheetApp = {
            getActive: jest.fn().mockReturnValue({
                getSheetByName: jest.fn().mockReturnValue(mockedSheet)
            })
        }
        const wordSheet = new TobWordSheetRepository(mockedSpreadsheetApp)

        wordSheet.get('foo')

        expect(getValues).toBeCalled()
    })
})

describe('WordSheet#insert', () => {
    it('should call Range#setValues', () => {
        const setValues = jest.fn()
        const mockedSheet = {
            getLastRow: jest.fn().mockReturnValue(1),
            getRange: jest.fn().mockReturnValue({
                setValues
            })
        }
        const mockedSpreadsheetApp = {
            getActive: jest.fn().mockReturnValue({
                getSheetByName: jest.fn().mockReturnValue(mockedSheet)
            })
        }
        const wordSheet = new TobWordSheetRepository(mockedSpreadsheetApp)
        const word = TobWord.reconstruct('foo', false)

        wordSheet.insert(word)

        expect(setValues).toBeCalledWith([word.toSheetValue()])
    })
})

describe('WordSheet#delete', () => {
    it('should call Range#setValues', () => {
        const deleteRow = jest.fn()
        const targetRow = 1
        const mockedSheet = {
            deleteRow,
            createTextFinder: jest.fn().mockReturnValue({
                findNext: jest.fn().mockReturnValue({
                    getRow: jest.fn().mockReturnValue(targetRow)
                })
            })
        }
        const mockedSpreadsheetApp = {
            getActive: jest.fn().mockReturnValue({
                getSheetByName: jest.fn().mockReturnValue(mockedSheet)
            })
        }
        const wordSheet = new TobWordSheetRepository(mockedSpreadsheetApp)

        wordSheet.delete(TobWord.reconstruct('foo', false))

        expect(deleteRow).toBeCalledWith(targetRow)
    })
})
