# FreePublicApis SDK configuration


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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "name": "tested",
            "short": "Last tested timestamp",
            "type": "`$STRING`",
          },
          {
            "name": "url",
            "short": "URL of the API",
            "type": "`$STRING`",
          },
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
                "parts": [
                  "api.php",
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
