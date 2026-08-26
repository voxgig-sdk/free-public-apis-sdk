
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'FreePublicApis',
        slug: "free-public-apis",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://www.freepublicapis.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      ap_i: {
      },

    }
  }


  entity = {
    "ap_i": {
      "fields": [
        {
          "name": "auth",
          "short": "Authentication type required",
          "type": "`$STRING`"
        },
        {
          "name": "category",
          "short": "Category of the API",
          "type": "`$STRING`"
        },
        {
          "name": "cors",
          "short": "CORS support status",
          "type": "`$STRING`"
        },
        {
          "name": "description",
          "short": "Description of the API functionality",
          "type": "`$STRING`"
        },
        {
          "name": "https",
          "short": "Whether the API supports HTTPS",
          "type": "`$BOOLEAN`"
        },
        {
          "name": "id",
          "short": "Unique identifier for the API",
          "type": "`$STRING`"
        },
        {
          "name": "name",
          "short": "Name of the API",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "short": "Current status of the API",
          "type": "`$STRING`"
        },
        {
          "name": "tested",
          "short": "Last tested timestamp",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "short": "URL of the API",
          "type": "`$STRING`"
        }
      ],
      "name": "ap_i",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "category",
                    "orig": "category",
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "limit",
                    "orig": "limit",
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/api.php",
              "parts": [
                "api.php"
              ],
              "select": {
                "exist": [
                  "category",
                  "limit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.apis`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

