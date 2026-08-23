-- FreePublicApis SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "FreePublicApis",
      slug = "free-public-apis",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://www.freepublicapis.com",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["ap_i"] = {},
      },
    },
    entity = {
      ["ap_i"] = {
        ["fields"] = {
          {
            ["name"] = "auth",
            ["short"] = "Authentication type required",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "category",
            ["short"] = "Category of the API",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "cors",
            ["short"] = "CORS support status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "description",
            ["short"] = "Description of the API functionality",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "https",
            ["short"] = "Whether the API supports HTTPS",
            ["type"] = "`$BOOLEAN`",
          },
          {
            ["name"] = "id",
            ["short"] = "Unique identifier for the API",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "name",
            ["short"] = "Name of the API",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["short"] = "Current status of the API",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "tested",
            ["short"] = "Last tested timestamp",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "url",
            ["short"] = "URL of the API",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "ap_i",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "category",
                      ["orig"] = "category",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api.php",
                ["parts"] = {
                  "api.php",
                },
                ["select"] = {
                  ["exist"] = {
                    "category",
                    "limit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.apis`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
