
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreePublicApisSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FreePublicApisSDK.test()
    equal(testsdk instanceof FreePublicApisSDK, true,
      'FreePublicApisSDK.test() must return a client synchronously')
  })

})
