<?php
declare(strict_types=1);

// FreePublicApis SDK utility: result_body

class FreePublicApisResultBody
{
    public static function call(FreePublicApisContext $ctx): ?FreePublicApisResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
