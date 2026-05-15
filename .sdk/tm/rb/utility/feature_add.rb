# FreePublicApis SDK utility: feature_add
module FreePublicApisUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
