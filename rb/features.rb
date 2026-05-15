# FreePublicApis SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module FreePublicApisFeatures
  def self.make_feature(name)
    case name
    when "base"
      FreePublicApisBaseFeature.new
    when "test"
      FreePublicApisTestFeature.new
    else
      FreePublicApisBaseFeature.new
    end
  end
end
