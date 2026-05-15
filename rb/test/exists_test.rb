# FreePublicApis SDK exists test

require "minitest/autorun"
require_relative "../FreePublicApis_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = FreePublicApisSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
