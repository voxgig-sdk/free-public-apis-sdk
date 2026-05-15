-- ProjectName SDK exists test

local sdk = require("free-public-apis_sdk")

describe("FreePublicApisSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
