const parent = require('@aryli/create-that.eslint.node').config
const withTypescript =
    require('@aryli/create-that.eslint.with-typescript').withTypescript

module.exports = withTypescript(parent, { tsProject: './tsconfig.json' })
