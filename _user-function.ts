/**
 *
 * @param rows - A queue that has the userId at first column
 * @example
 * =arrayformula(concatenateActiveWords(A1:A))
 */
function concatenateActiveWords(
    rows: ReadonlyArray<ReadonlyArray<string | number | boolean>>
): string[] {
    const spreadsheet = SpreadsheetApp.getActive()
    const sheetOfMirroredWordsButIgnoringA = spreadsheet.getSheetByName(
        'MirroredWordsButIgnoringA'
    )

    if (sheetOfMirroredWordsButIgnoringA == null) {
        throw new Error('「MirroredWordsButIgnoringA」シートがありません。')
    }

    return rows.map(([cell]) => {
        // The value of a blank cell is empty string (`''`)
        if (cell === '') {
            return ''
        }

        const textFinder = sheetOfMirroredWordsButIgnoringA.createTextFinder(
            cell.toString()
        )
        const ranges = textFinder.findAll()
        const returns = ranges.reduce<string[]>((acc, range) => {
            const valueRange = [range.getRow(), 1] as [number, number]
            const activeRange = [range.getRow(), 3] as [number, number]
            const s = sheetOfMirroredWordsButIgnoringA

            const isActive = s.getRange(...activeRange).getValue() as boolean
            if (isActive) {
                acc.push(
                    sheetOfMirroredWordsButIgnoringA
                        .getRange(...valueRange)
                        .getValue()
                )
            }

            return acc
        }, [])

        return returns.join(',')
    })
}
