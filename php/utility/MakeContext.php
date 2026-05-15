<?php
declare(strict_types=1);

// FreePublicApis SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class FreePublicApisMakeContext
{
    public static function call(array $ctxmap, ?FreePublicApisContext $basectx): FreePublicApisContext
    {
        return new FreePublicApisContext($ctxmap, $basectx);
    }
}
