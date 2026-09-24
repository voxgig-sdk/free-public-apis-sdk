

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


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ApiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when FREE_PUBLIC_APIS_TEST_LIVE=TRUE.
  afterEach(liveDelay('FREE_PUBLIC_APIS_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = FreePublicApisSDK.test()
    const ent = testsdk.Api()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.FREE_PUBLIC_APIS_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'api.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"auth":{"a":true,"h":"Auth","n":"auth","r":false,"sh":"Authentication type required","t":"`$STRING`","key$":"auth","index$":0},"category":{"a":true,"h":"Category","n":"category","r":false,"sh":"Category of the API","t":"`$STRING`","key$":"category","index$":1},"cors":{"a":true,"h":"Cors","n":"cors","r":false,"sh":"CORS support status","t":"`$STRING`","key$":"cors","index$":2},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the API functionality","t":"`$STRING`","key$":"description","index$":3},"https":{"a":true,"h":"Https","n":"https","r":false,"sh":"Whether the API supports HTTPS","t":"`$BOOLEAN`","key$":"https","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the API","t":"`$STRING`","key$":"id","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the API","t":"`$STRING`","key$":"name","index$":6},"status":{"a":true,"h":"Status","n":"status","r":false,"sh":"Current status of the API","t":"`$STRING`","key$":"status","index$":7},"tested":{"a":true,"fo":"date-time","h":"Tested","n":"tested","r":false,"sh":"Last tested timestamp","t":"`$STRING`","key$":"tested","index$":8},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":false,"sh":"URL of the API","t":"`$STRING`","key$":"url","index$":9}},"id":{"field":"id","name":"id"},"name":"api","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"category","or":"category","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/api.php","q":{"exist":["category","limit"]},"r":{},"s":[{"lit":"api.php"}],"t":{"req":"`reqdata`","res":"`body.apis`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"api","name__orig":"api","Name":"Api","name_":"api","name-":"api","NAME":"API","index$":0}, {"active":true,"entity":"api","key$":"BasicApiFlow","kind":"basic","name":"BasicApiFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"api_ref01"}}],"index$":0}]}, 'Api', {"GET /api.php":{"protocol":"http","operationId":"getPublicAPIs","responses":{"200":{"description":"Successful response with list of public APIs","content":{"application/json":{"schema":{"type":"object","properties":{"count":{"description":"Total number of APIs returned","example":489,"key$":"count","type":"integer"},"apis":{"items":{"properties":{"auth":{"description":"Authentication type required","type":"string","key$":"auth"},"category":{"description":"Category of the API","type":"string","key$":"category"},"cors":{"description":"CORS support status","type":"string","key$":"cors"},"description":{"description":"Description of the API functionality","type":"string","key$":"description"},"https":{"description":"Whether the API supports HTTPS","type":"boolean","key$":"https"},"id":{"description":"Unique identifier for the API","type":"string","key$":"id"},"name":{"description":"Name of the API","type":"string","key$":"name"},"status":{"description":"Current status of the API","type":"string","key$":"status"},"tested":{"description":"Last tested timestamp","format":"date-time","type":"string","key$":"tested"},"url":{"description":"URL of the API","format":"uri","type":"string","key$":"url"}},"type":"object","index$":0},"key$":"apis","type":"array"}}},"example":{"count":489,"apis":[{"id":"1","name":"Example API","description":"A free public API for developers","url":"https://api.example.com","category":"Development","auth":"apiKey","https":true,"cors":"yes","tested":"2024-01-15T10:30:00Z","status":"active"}]}}}},"400":{"description":"Bad request - invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message"}}}}}}},"parameters":[{"name":"category","in":"query","description":"Filter APIs by category","required":false,"schema":{"type":"string"},"index$":0},{"name":"limit","in":"query","description":"Limit the number of results returned","required":false,"schema":{"type":"integer","minimum":1,"maximum":500},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let api_ref01_data = Object.values(setup.data.existing.api)[0] as any

    // LIST
    const api_ref01_ent = client.Api()
    const api_ref01_match: any = {}

    const api_ref01_list = (await api_ref01_ent.list(api_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/api/ApiTestData.json')

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
    ['api01','api02','api03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'FREE_PUBLIC_APIS_TEST_API_ENTID': idmap,
    'FREE_PUBLIC_APIS_TEST_LIVE': 'FALSE',
    'FREE_PUBLIC_APIS_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['FREE_PUBLIC_APIS_TEST_API_ENTID']

  const live = 'TRUE' === env.FREE_PUBLIC_APIS_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['FREE_PUBLIC_APIS_TEST_API_ENTID']
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
  
