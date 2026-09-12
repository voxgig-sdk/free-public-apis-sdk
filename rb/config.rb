# FreePublicApis SDK configuration

module FreePublicApisConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "FreePublicApis",
        "slug" => "free-public-apis",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
        },
      },
      "options" => {
        "base" => "https://www.freepublicapis.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "ap_i" => {},
        },
      },
      "entity" => {
        "ap_i" => {
          "fields" => [
            {
              "name" => "auth",
              "short" => "Authentication type required",
              "type" => "`$STRING`",
            },
            {
              "name" => "category",
              "short" => "Category of the API",
              "type" => "`$STRING`",
            },
            {
              "name" => "cors",
              "short" => "CORS support status",
              "type" => "`$STRING`",
            },
            {
              "name" => "description",
              "short" => "Description of the API functionality",
              "type" => "`$STRING`",
            },
            {
              "name" => "https",
              "short" => "Whether the API supports HTTPS",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "id",
              "short" => "Unique identifier for the API",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "short" => "Name of the API",
              "type" => "`$STRING`",
            },
            {
              "name" => "status",
              "short" => "Current status of the API",
              "type" => "`$STRING`",
            },
            {
              "format" => "date-time",
              "name" => "tested",
              "short" => "Last tested timestamp",
              "type" => "`$STRING`",
            },
            {
              "format" => "uri",
              "name" => "url",
              "short" => "URL of the API",
              "type" => "`$STRING`",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "ap_i",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "category",
                        "orig" => "category",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api.php",
                  "segments" => [
                    {
                      "lit" => "api.php",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "category",
                      "limit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.apis`",
                  },
                  "parts" => [
                    "api.php",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    FreePublicApisFeatures.make_feature(name)
  end
end
