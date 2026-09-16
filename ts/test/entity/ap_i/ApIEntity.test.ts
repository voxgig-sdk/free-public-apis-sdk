

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { FreePublicApisSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('ApIEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_PUBLIC_APIS_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_PUBLIC_APIS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreePublicApisSDK.test()
    const ent = testsdk.ApI()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_PUBLIC_APIS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ap_i.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"auth","req":false,"short":"Authentication type required","type":"`$STRING`","index$":0},{"active":true,"name":"category","req":false,"short":"Category of the API","type":"`$STRING`","index$":1},{"active":true,"name":"cors","req":false,"short":"CORS support status","type":"`$STRING`","index$":2},{"active":true,"name":"description","req":false,"short":"Description of the API functionality","type":"`$STRING`","index$":3},{"active":true,"name":"https","req":false,"short":"Whether the API supports HTTPS","type":"`$BOOLEAN`","index$":4},{"active":true,"name":"id","req":false,"short":"Unique identifier for the API","type":"`$STRING`","index$":5},{"active":true,"name":"name","req":false,"short":"Name of the API","type":"`$STRING`","index$":6},{"active":true,"name":"status","req":false,"short":"Current status of the API","type":"`$STRING`","index$":7},{"active":true,"format":"date-time","name":"tested","req":false,"short":"Last tested timestamp","type":"`$STRING`","index$":8},{"active":true,"format":"uri","name":"url","req":false,"short":"URL of the API","type":"`$STRING`","index$":9}],"id":{"field":"id","name":"id"},"name":"ap_i","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"category","orig":"category","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /api.php","json":"{\"operationId\":\"getPublicAPIs\",\"parameters\":[{\"description\":\"Filter APIs by category\",\"in\":\"query\",\"name\":\"category\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Limit the number of results returned\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"maximum\":500,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"apis\":[{\"auth\":\"apiKey\",\"category\":\"Development\",\"cors\":\"yes\",\"description\":\"A free public API for developers\",\"https\":true,\"id\":\"1\",\"name\":\"Example API\",\"status\":\"active\",\"tested\":\"2024-01-15T10:30:00Z\",\"url\":\"https://api.example.com\"}],\"count\":489},\"schema\":{\"properties\":{\"apis\":{\"items\":{\"properties\":{\"auth\":{\"description\":\"Authentication type required\",\"type\":\"string\"},\"category\":{\"description\":\"Category of the API\",\"type\":\"string\"},\"cors\":{\"description\":\"CORS support status\",\"type\":\"string\"},\"description\":{\"description\":\"Description of the API functionality\",\"type\":\"string\"},\"https\":{\"description\":\"Whether the API supports HTTPS\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the API\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the API\",\"type\":\"string\"},\"status\":{\"description\":\"Current status of the API\",\"type\":\"string\"},\"tested\":{\"description\":\"Last tested timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"description\":\"URL of the API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"count\":{\"description\":\"Total number of APIs returned\",\"example\":489,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of public APIs\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api.php","segments":[{"lit":"api.php"}],"select":{"exist":["category","limit"]},"transform":{"req":"`reqdata`","res":"`body.apis`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"ap_i","name__orig":"ap_i","Name":"ApI","name_":"ap_i","name-":"ap-i","NAME":"AP_I","index$":0}, {"active":true,"entity":"ap_i","key$":"BasicApIFlow","kind":"basic","name":"BasicApIFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"ap_i_ref01"}}],"index$":0}]}, 'ApI')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ap_i_ref01_data = Object.values(setup.data.existing.ap_i)[0] as any

    // LIST
    const ap_i_ref01_ent = client.ApI()
    const ap_i_ref01_match: any = {}

    const ap_i_ref01_list = (await ap_i_ref01_ent.list(ap_i_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ap_i/ApITestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = FreePublicApisSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['ap_i01','ap_i02','ap_i03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_PUBLIC_APIS_TEST_AP_I_ENTID': idmap,
    'FREE_PUBLIC_APIS_TEST_LIVE': 'FALSE',
    'FREE_PUBLIC_APIS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FREE_PUBLIC_APIS_TEST_AP_I_ENTID']

  const live = 'TRUE' === env.FREE_PUBLIC_APIS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_PUBLIC_APIS_TEST_AP_I_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new FreePublicApisSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.FREE_PUBLIC_APIS_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
