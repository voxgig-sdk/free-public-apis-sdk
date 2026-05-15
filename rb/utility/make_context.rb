# FreePublicApis SDK utility: make_context
require_relative '../core/context'
module FreePublicApisUtilities
  MakeContext = ->(ctxmap, basectx) {
    FreePublicApisContext.new(ctxmap, basectx)
  }
end
