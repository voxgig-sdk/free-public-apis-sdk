// Typed models for the FreePublicApis SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Api {
  auth?: string
  category?: string
  cors?: string
  description?: string
  https?: boolean
  id?: string
  name?: string
  status?: string
  tested?: string
  url?: string
}

export interface ApiListMatch {
  category?: string
  limit?: number
}

