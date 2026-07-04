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
# @!attribute [rw] cor
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] http
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
  :cor,
  :description,
  :http,
  :id,
  :name,
  :status,
  :tested,
  :url,
  keyword_init: true
)

# Match filter for ApI#list (any subset of ApI fields).
#
# @!attribute [rw] auth
#   @return [String, nil]
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] cor
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] http
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
ApIListMatch = Struct.new(
  :auth,
  :category,
  :cor,
  :description,
  :http,
  :id,
  :name,
  :status,
  :tested,
  :url,
  keyword_init: true
)

