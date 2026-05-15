package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/free-public-apis-sdk"
	"github.com/voxgig-sdk/free-public-apis-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestApIEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.ApI(nil)
		if ent == nil {
			t.Fatal("expected non-nil ApIEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := ap_iBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "ap_i." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set FREEPUBLICAPIS_TEST_AP_I_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		apIRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.ap_i", setup.data)))
		var apIRef01Data map[string]any
		if len(apIRef01DataRaw) > 0 {
			apIRef01Data = core.ToMapAny(apIRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = apIRef01Data

		// LIST
		apIRef01Ent := client.ApI(nil)
		apIRef01Match := map[string]any{}

		apIRef01ListResult, err := apIRef01Ent.List(apIRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, apIRef01ListOk := apIRef01ListResult.([]any)
		if !apIRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", apIRef01ListResult)
		}

	})
}

func ap_iBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "ap_i", "ApITestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read ap_i test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse ap_i test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"ap_i01", "ap_i02", "ap_i03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("FREEPUBLICAPIS_TEST_AP_I_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"FREEPUBLICAPIS_TEST_AP_I_ENTID": idmap,
		"FREEPUBLICAPIS_TEST_LIVE":      "FALSE",
		"FREEPUBLICAPIS_TEST_EXPLAIN":   "FALSE",
		"FREEPUBLICAPIS_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["FREEPUBLICAPIS_TEST_AP_I_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["FREEPUBLICAPIS_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["FREEPUBLICAPIS_APIKEY"],
			},
			extra,
		})
		client = sdk.NewFreePublicApisSDK(core.ToMapAny(mergedOpts))
	}

	live := env["FREEPUBLICAPIS_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["FREEPUBLICAPIS_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
