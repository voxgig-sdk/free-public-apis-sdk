-- FreePublicApis SDK error

local FreePublicApisError = {}
FreePublicApisError.__index = FreePublicApisError


function FreePublicApisError.new(code, msg, ctx)
  local self = setmetatable({}, FreePublicApisError)
  self.is_sdk_error = true
  self.sdk = "FreePublicApis"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function FreePublicApisError:error()
  return self.msg
end


function FreePublicApisError:__tostring()
  return self.msg
end


return FreePublicApisError
