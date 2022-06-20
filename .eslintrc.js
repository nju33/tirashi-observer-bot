const parent = require('@aryli/create-that.eslint.node').config
const withTypescript =
    require('@aryli/create-that.eslint.with-typescript').withTypescript

const config = withTypescript(parent, { tsProject: './tsconfig.json' })
module.exports = {
    ...config,
    overrides: [
        {
            files: '**/*.ts',
            rules: {
                'unused-imports/no-unused-vars': 'off',
                // ^ because `eslint-disable` comments is deleted after you run `clasp pull`

                // allows me to use `word.toString()`
                '@typescript-eslint/no-base-to-string': [
                    'error',
                    {
                        ignoredTypeNames: ['Word']
                    }
                ]
            }
        }
    ]
}
