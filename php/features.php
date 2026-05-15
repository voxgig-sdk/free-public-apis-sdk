<?php
declare(strict_types=1);

// FreePublicApis SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class FreePublicApisFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new FreePublicApisBaseFeature();
            case "test":
                return new FreePublicApisTestFeature();
            default:
                return new FreePublicApisBaseFeature();
        }
    }
}
