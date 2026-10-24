-- FreePublicApis SDK error

local json = require("dkjson")

local FreePublicApisError = {}
FreePublicApisError.__index = FreePublicApisError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function FreePublicApisError.new(code, msg, ctx)
  local self = setmetatable({}, FreePublicApisError)
  self.is_sdk_error = true
  self.sdk = "FreePublicApis"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function FreePublicApisError:context()
  return CONTEXT[self]
end


function FreePublicApisError:error()
  return self.msg
end


function FreePublicApisError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function FreePublicApisError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function FreePublicApisError:to_json()
  return json.encode(self:to_table())
end


function FreePublicApisError:__tostring()
  return self.msg
end


function FreePublicApisError.__tojson(self)
  return self:to_json()
end


return FreePublicApisError
