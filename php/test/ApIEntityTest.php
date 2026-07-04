<?php
declare(strict_types=1);

// ApI entity test

require_once __DIR__ . '/../freepublicapis_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ApIEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = FreePublicApisSDK::test(null, null);
        $ent = $testsdk->ApI(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = ap_i_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "ap_i." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set FREEPUBLICAPIS_TEST_AP_I_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $ap_i_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.ap_i")));
        $ap_i_ref01_data = null;
        if (count($ap_i_ref01_data_raw) > 0) {
            $ap_i_ref01_data = Helpers::to_map($ap_i_ref01_data_raw[0][1]);
        }

        // LIST
        $ap_i_ref01_ent = $client->ApI(null);
        $ap_i_ref01_match = [];

        $ap_i_ref01_list_result = $ap_i_ref01_ent->list($ap_i_ref01_match, null);
        $this->assertIsArray($ap_i_ref01_list_result);

    }
}

function ap_i_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/ap_i/ApITestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = FreePublicApisSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["ap_i01", "ap_i02", "ap_i03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("FREEPUBLICAPIS_TEST_AP_I_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "FREEPUBLICAPIS_TEST_AP_I_ENTID" => $idmap,
        "FREEPUBLICAPIS_TEST_LIVE" => "FALSE",
        "FREEPUBLICAPIS_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["FREEPUBLICAPIS_TEST_AP_I_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["FREEPUBLICAPIS_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new FreePublicApisSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["FREEPUBLICAPIS_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["FREEPUBLICAPIS_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
