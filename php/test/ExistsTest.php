<?php
declare(strict_types=1);

// FreePublicApis SDK exists test

require_once __DIR__ . '/../freepublicapis_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = FreePublicApisSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
