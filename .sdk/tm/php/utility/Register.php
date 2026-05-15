<?php
declare(strict_types=1);

// FreePublicApis SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

FreePublicApisUtility::setRegistrar(function (FreePublicApisUtility $u): void {
    $u->clean = [FreePublicApisClean::class, 'call'];
    $u->done = [FreePublicApisDone::class, 'call'];
    $u->make_error = [FreePublicApisMakeError::class, 'call'];
    $u->feature_add = [FreePublicApisFeatureAdd::class, 'call'];
    $u->feature_hook = [FreePublicApisFeatureHook::class, 'call'];
    $u->feature_init = [FreePublicApisFeatureInit::class, 'call'];
    $u->fetcher = [FreePublicApisFetcher::class, 'call'];
    $u->make_fetch_def = [FreePublicApisMakeFetchDef::class, 'call'];
    $u->make_context = [FreePublicApisMakeContext::class, 'call'];
    $u->make_options = [FreePublicApisMakeOptions::class, 'call'];
    $u->make_request = [FreePublicApisMakeRequest::class, 'call'];
    $u->make_response = [FreePublicApisMakeResponse::class, 'call'];
    $u->make_result = [FreePublicApisMakeResult::class, 'call'];
    $u->make_point = [FreePublicApisMakePoint::class, 'call'];
    $u->make_spec = [FreePublicApisMakeSpec::class, 'call'];
    $u->make_url = [FreePublicApisMakeUrl::class, 'call'];
    $u->param = [FreePublicApisParam::class, 'call'];
    $u->prepare_auth = [FreePublicApisPrepareAuth::class, 'call'];
    $u->prepare_body = [FreePublicApisPrepareBody::class, 'call'];
    $u->prepare_headers = [FreePublicApisPrepareHeaders::class, 'call'];
    $u->prepare_method = [FreePublicApisPrepareMethod::class, 'call'];
    $u->prepare_params = [FreePublicApisPrepareParams::class, 'call'];
    $u->prepare_path = [FreePublicApisPreparePath::class, 'call'];
    $u->prepare_query = [FreePublicApisPrepareQuery::class, 'call'];
    $u->result_basic = [FreePublicApisResultBasic::class, 'call'];
    $u->result_body = [FreePublicApisResultBody::class, 'call'];
    $u->result_headers = [FreePublicApisResultHeaders::class, 'call'];
    $u->transform_request = [FreePublicApisTransformRequest::class, 'call'];
    $u->transform_response = [FreePublicApisTransformResponse::class, 'call'];
});
