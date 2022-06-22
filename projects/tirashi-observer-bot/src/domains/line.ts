import { AToken as _AToken } from './token'

const AToken: typeof _AToken =
    typeof _AToken === 'undefined' ? exports.AToken : _AToken

export class LineToken extends AToken {}
