<?php
declare(strict_types=1);

// FreePublicApis SDK utility: prepare_body

class FreePublicApisPrepareBody
{
    public static function call(FreePublicApisContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
