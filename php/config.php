<?php
declare(strict_types=1);

// FreePublicApis SDK configuration

class FreePublicApisConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "FreePublicApis",
                "slug" => "free-public-apis",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://www.freepublicapis.com",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "ap_i" => [],
                ],
            ],
            "entity" => [
        'ap_i' => [
          'fields' => [
            [
              'name' => 'auth',
              'short' => 'Authentication type required',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'category',
              'short' => 'Category of the API',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'cors',
              'short' => 'CORS support status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'description',
              'short' => 'Description of the API functionality',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'https',
              'short' => 'Whether the API supports HTTPS',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'id',
              'short' => 'Unique identifier for the API',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Name of the API',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'short' => 'Current status of the API',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'date-time',
              'name' => 'tested',
              'short' => 'Last tested timestamp',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'uri',
              'name' => 'url',
              'short' => 'URL of the API',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'ap_i',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'category',
                        'orig' => 'category',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api.php',
                  'segments' => [
                    [
                      'lit' => 'api.php',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'category',
                      'limit',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.apis`',
                  ],
                  'parts' => [
                    'api.php',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return FreePublicApisFeatures::make_feature($name);
    }
}
