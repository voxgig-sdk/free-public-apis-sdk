# FreePublicApis SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "FreePublicApis",
            "slug": "free-public-apis",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://www.freepublicapis.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "ap_i": {},
            },
        },
        "entity": {
      "ap_i": {
        "fields": [
          {
            "name": "auth",
            "short": "Authentication type required",
            "type": "`$STRING`",
          },
          {
            "name": "category",
            "short": "Category of the API",
            "type": "`$STRING`",
          },
          {
            "name": "cors",
            "short": "CORS support status",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Description of the API functionality",
            "type": "`$STRING`",
          },
          {
            "name": "https",
            "short": "Whether the API supports HTTPS",
            "type": "`$BOOLEAN`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the API",
            "type": "`$STRING`",
          },
          {
            "name": "name",
            "short": "Name of the API",
            "type": "`$STRING`",
          },
          {
            "name": "status",
            "short": "Current status of the API",
            "type": "`$STRING`",
          },
          {
            "format": "date-time",
            "name": "tested",
            "short": "Last tested timestamp",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "short": "URL of the API",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
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
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/api.php",
                "segments": [
                  {
                    "lit": "api.php",
                  },
                ],
                "select": {
                  "exist": [
                    "category",
                    "limit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.apis`",
                },
                "parts": [
                  "api.php",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
