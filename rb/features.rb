# FreePublicApis SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module FreePublicApisFeatures
  def self.make_feature(name)
    case name
    when "base"
      FreePublicApisBaseFeature.new
    when "ratelimit"
      FreePublicApisRatelimitFeature.new
    when "retry"
      FreePublicApisRetryFeature.new
    when "test"
      FreePublicApisTestFeature.new
    when "timeout"
      FreePublicApisTimeoutFeature.new
    else
      FreePublicApisBaseFeature.new
    end
  end
end
