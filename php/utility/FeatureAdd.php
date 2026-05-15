<?php
declare(strict_types=1);

// FreePublicApis SDK utility: feature_add

class FreePublicApisFeatureAdd
{
    public static function call(FreePublicApisContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
