package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "FreePublicApis",
			"slug": "free-public-apis",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://www.freepublicapis.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"ap_i": map[string]any{},
			},
		},
		"entity": map[string]any{
			"ap_i": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "auth",
						"short": "Authentication type required",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "category",
						"short": "Category of the API",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cors",
						"short": "CORS support status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the API functionality",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "https",
						"short": "Whether the API supports HTTPS",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the API",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the API",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Current status of the API",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "tested",
						"short": "Last tested timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "URL of the API",
						"type": "`$STRING`",
					},
				},
				"name": "ap_i",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api.php",
								"parts": []any{
									"api.php",
								},
								"select": map[string]any{
									"exist": []any{
										"category",
										"limit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.apis`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
