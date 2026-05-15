
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FreePublicApisSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await FreePublicApisSDK.test()
    equal(null !== testsdk, true)
  })

})
