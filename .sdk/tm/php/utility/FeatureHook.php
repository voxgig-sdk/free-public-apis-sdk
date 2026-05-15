<?php
declare(strict_types=1);

// FreePublicApis SDK utility: feature_hook

class FreePublicApisFeatureHook
{
    public static function call(FreePublicApisContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
