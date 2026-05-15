<?php
declare(strict_types=1);

// FreePublicApis SDK utility: result_headers

class FreePublicApisResultHeaders
{
    public static function call(FreePublicApisContext $ctx): ?FreePublicApisResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
