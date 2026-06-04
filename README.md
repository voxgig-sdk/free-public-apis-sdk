# FreePublicApis SDK

Browse a curated, daily-tested catalogue of free public APIs for students and developers

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Free Public APIs

[Free Public APIs](https://www.freepublicapis.com) is a community-maintained directory of free, publicly accessible APIs aimed at students, hobbyists, and developers looking for data sources to build with. The catalogue lists hundreds of APIs across categories such as AI, weather, sports, entertainment, finance, geography, and more.

What the catalogue surfaces for each entry:

- A description of the API and its provider
- A link to the upstream API and its documentation
- Category tags and curated rankings (e.g. Best, Fastest, Most Popular, Newest)
- Health and reliability metrics derived from daily automated checks

Entries are re-tested every day so listings reflect current reachability rather than a one-time snapshot. The site itself is a browsable directory; the upstream APIs it links to each have their own authentication, rate-limit, and licensing rules that apply when you actually call them.

## Try it

**TypeScript**
```bash
npm install free-public-apis
```

**Python**
```bash
pip install free-public-apis-sdk
```

**PHP**
```bash
composer require voxgig/free-public-apis-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/free-public-apis-sdk/go
```

**Ruby**
```bash
gem install free-public-apis-sdk
```

**Lua**
```bash
luarocks install free-public-apis-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { FreePublicApisSDK } from 'free-public-apis'

const client = new FreePublicApisSDK({})

// List all apis
const apis = await client.ApI().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o free-public-apis-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "free-public-apis": {
      "command": "/abs/path/to/free-public-apis-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **ApI** | An entry in the freepublicapis.com directory, representing a single third-party public API with its metadata, category, and health/reliability information. | `/api.php` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from freepublicapis_sdk import FreePublicApisSDK

client = FreePublicApisSDK({})

# List all apis
apis, err = client.ApI(None).list(None, None)
```

### PHP

```php
<?php
require_once 'freepublicapis_sdk.php';

$client = new FreePublicApisSDK([]);

// List all apis
[$apis, $err] = $client->ApI(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/free-public-apis-sdk/go"

client := sdk.NewFreePublicApisSDK(map[string]any{})

// List all apis
apis, err := client.ApI(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "FreePublicApis_sdk"

client = FreePublicApisSDK.new({})

# List all apis
apis, err = client.ApI(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("free-public-apis_sdk")

local client = sdk.new({})

-- List all apis
local apis, err = client:ApI(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = FreePublicApisSDK.test()
const result = await client.ApI().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = FreePublicApisSDK.test(None, None)
result, err = client.ApI(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = FreePublicApisSDK::test(null, null);
[$result, $err] = $client->ApI(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.ApI(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = FreePublicApisSDK.test(nil, nil)
result, err = client.ApI(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:ApI(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Free Public APIs

- Upstream: [https://www.freepublicapis.com](https://www.freepublicapis.com)

- Use of the catalogue is governed by the [freepublicapis.com Terms of Service](https://www.freepublicapis.com/terms-of-service) and [Privacy Policy](https://www.freepublicapis.com/privacy-policy).
- Each API listed in the catalogue is owned and licensed by its respective provider; consult the linked API's own terms before use.
- No attribution requirements are documented for the catalogue itself, but individual APIs may require attribution.

---

Generated from the Free Public APIs OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
