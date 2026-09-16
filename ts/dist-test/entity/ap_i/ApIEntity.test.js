"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ApIEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when FREE_PUBLIC_APIS_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('FREE_PUBLIC_APIS_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.FreePublicApisSDK.test();
        const ent = testsdk.ApI();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.FREE_PUBLIC_APIS_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'ap_i.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "auth", "req": false, "short": "Authentication type required", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "category", "req": false, "short": "Category of the API", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "cors", "req": false, "short": "CORS support status", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "description", "req": false, "short": "Description of the API functionality", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "https", "req": false, "short": "Whether the API supports HTTPS", "type": "`$BOOLEAN`", "index$": 4 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the API", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "name", "req": false, "short": "Name of the API", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "status", "req": false, "short": "Current status of the API", "type": "`$STRING`", "index$": 7 }, { "active": true, "format": "date-time", "name": "tested", "req": false, "short": "Last tested timestamp", "type": "`$STRING`", "index$": 8 }, { "active": true, "format": "uri", "name": "url", "req": false, "short": "URL of the API", "type": "`$STRING`", "index$": 9 }], "id": { "field": "id", "name": "id" }, "name": "ap_i", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "category", "orig": "category", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "limit", "orig": "limit", "reqd": false, "type": "`$INTEGER`", "index$": 1 }] }, "contract": { "id": "GET /api.php", "json": "{\"operationId\":\"getPublicAPIs\",\"parameters\":[{\"description\":\"Filter APIs by category\",\"in\":\"query\",\"name\":\"category\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Limit the number of results returned\",\"in\":\"query\",\"name\":\"limit\",\"required\":false,\"schema\":{\"maximum\":500,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"apis\":[{\"auth\":\"apiKey\",\"category\":\"Development\",\"cors\":\"yes\",\"description\":\"A free public API for developers\",\"https\":true,\"id\":\"1\",\"name\":\"Example API\",\"status\":\"active\",\"tested\":\"2024-01-15T10:30:00Z\",\"url\":\"https://api.example.com\"}],\"count\":489},\"schema\":{\"properties\":{\"apis\":{\"items\":{\"properties\":{\"auth\":{\"description\":\"Authentication type required\",\"type\":\"string\"},\"category\":{\"description\":\"Category of the API\",\"type\":\"string\"},\"cors\":{\"description\":\"CORS support status\",\"type\":\"string\"},\"description\":{\"description\":\"Description of the API functionality\",\"type\":\"string\"},\"https\":{\"description\":\"Whether the API supports HTTPS\",\"type\":\"boolean\"},\"id\":{\"description\":\"Unique identifier for the API\",\"type\":\"string\"},\"name\":{\"description\":\"Name of the API\",\"type\":\"string\"},\"status\":{\"description\":\"Current status of the API\",\"type\":\"string\"},\"tested\":{\"description\":\"Last tested timestamp\",\"format\":\"date-time\",\"type\":\"string\"},\"url\":{\"description\":\"URL of the API\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"count\":{\"description\":\"Total number of APIs returned\",\"example\":489,\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response with list of public APIs\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api.php", "segments": [{ "lit": "api.php" }], "select": { "exist": ["category", "limit"] }, "transform": { "req": "`reqdata`", "res": "`body.apis`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "ap_i", "name__orig": "ap_i", "Name": "ApI", "name_": "ap_i", "name-": "ap-i", "NAME": "AP_I", "index$": 0 }, { "active": true, "entity": "ap_i", "key$": "BasicApIFlow", "kind": "basic", "name": "BasicApIFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "ap_i_ref01" } }], "index$": 0 }] }, 'ApI');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let ap_i_ref01_data = Object.values(setup.data.existing.ap_i)[0];
        // LIST
        const ap_i_ref01_ent = client.ApI();
        const ap_i_ref01_match = {};
        const ap_i_ref01_list = (await ap_i_ref01_ent.list(ap_i_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/ap_i/ApITestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.FreePublicApisSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['ap_i01', 'ap_i02', 'ap_i03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'FREE_PUBLIC_APIS_TEST_AP_I_ENTID': idmap,
        'FREE_PUBLIC_APIS_TEST_LIVE': 'FALSE',
        'FREE_PUBLIC_APIS_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['FREE_PUBLIC_APIS_TEST_AP_I_ENTID'];
    const live = 'TRUE' === env.FREE_PUBLIC_APIS_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['FREE_PUBLIC_APIS_TEST_AP_I_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.FreePublicApisSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=ApIEntity.test.js.map