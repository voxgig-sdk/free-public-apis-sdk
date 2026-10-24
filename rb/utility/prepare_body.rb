# FreePublicApis SDK utility: prepare_body
require_relative 'media'
module FreePublicApisUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return FreePublicApisUtilities.raw_body(ctx.reqdata) if FreePublicApisUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
