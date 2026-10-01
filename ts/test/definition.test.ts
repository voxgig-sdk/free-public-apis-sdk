import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "api",
    "accessor": "Api",
    "op": "list",
    "method": "GET",
    "path": "/api.php",
    "args": [],
    "select": {
      "category": "v1",
      "limit": "v1"
    },
    "headers": [],
    "query": [
      "category",
      "limit"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "count": 489,
      "apis": [
        {
          "id": "1",
          "name": "Example API",
          "description": "A free public API for developers",
          "url": "https://api.example.com",
          "category": "Development",
          "auth": "apiKey",
          "https": true,
          "cors": "yes",
          "tested": "2024-01-15T10:30:00Z",
          "status": "active"
        }
      ]
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
