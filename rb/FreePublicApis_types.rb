# frozen_string_literal: true

# Typed models for the FreePublicApis SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# ApI entity data model.
#
# @!attribute [rw] auth
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] cors
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] https
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] tested
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
ApI = Struct.new(
  :auth,
  :category,
  :cors,
  :description,
  :https,
  :id,
  :name,
  :status,
  :tested,
  :url,
  keyword_init: true
)

# Request payload for ApI#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
ApIListMatch = Struct.new(
  :category,
  :limit,
  keyword_init: true
)

