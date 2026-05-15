# FreePublicApis SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

FreePublicApisUtility.registrar = ->(u) {
  u.clean = FreePublicApisUtilities::Clean
  u.done = FreePublicApisUtilities::Done
  u.make_error = FreePublicApisUtilities::MakeError
  u.feature_add = FreePublicApisUtilities::FeatureAdd
  u.feature_hook = FreePublicApisUtilities::FeatureHook
  u.feature_init = FreePublicApisUtilities::FeatureInit
  u.fetcher = FreePublicApisUtilities::Fetcher
  u.make_fetch_def = FreePublicApisUtilities::MakeFetchDef
  u.make_context = FreePublicApisUtilities::MakeContext
  u.make_options = FreePublicApisUtilities::MakeOptions
  u.make_request = FreePublicApisUtilities::MakeRequest
  u.make_response = FreePublicApisUtilities::MakeResponse
  u.make_result = FreePublicApisUtilities::MakeResult
  u.make_point = FreePublicApisUtilities::MakePoint
  u.make_spec = FreePublicApisUtilities::MakeSpec
  u.make_url = FreePublicApisUtilities::MakeUrl
  u.param = FreePublicApisUtilities::Param
  u.prepare_auth = FreePublicApisUtilities::PrepareAuth
  u.prepare_body = FreePublicApisUtilities::PrepareBody
  u.prepare_headers = FreePublicApisUtilities::PrepareHeaders
  u.prepare_method = FreePublicApisUtilities::PrepareMethod
  u.prepare_params = FreePublicApisUtilities::PrepareParams
  u.prepare_path = FreePublicApisUtilities::PreparePath
  u.prepare_query = FreePublicApisUtilities::PrepareQuery
  u.result_basic = FreePublicApisUtilities::ResultBasic
  u.result_body = FreePublicApisUtilities::ResultBody
  u.result_headers = FreePublicApisUtilities::ResultHeaders
  u.transform_request = FreePublicApisUtilities::TransformRequest
  u.transform_response = FreePublicApisUtilities::TransformResponse
}
