import { TobWordRegexp } from './regexp'

describe('TobWordRegexp#test', () => {
    it('should match text with a word', () => {
        const wordRegexp = new TobWordRegexp('キャベツ')

        const result = wordRegexp.test(
            'あいうえお キャベッ かきくけこ 安い安い'
        )

        expect(result).toBe(true)
    })

    it('should match text with words', () => {
        const wordRegexp = new TobWordRegexp('茨城県産&キャベツ')

        const result = wordRegexp.test(
            'あいうえお 茨城県産 キャベッ かきくけこ 安い安い'
        )

        expect(result).toBe(true)
    })
})
