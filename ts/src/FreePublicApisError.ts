
import { Context } from './Context'


class FreePublicApisError extends Error {

  isFreePublicApisError = true

  sdk = 'FreePublicApis'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  FreePublicApisError
}

