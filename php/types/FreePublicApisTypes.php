<?php
declare(strict_types=1);

// Typed models for the FreePublicApis SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** ApI entity data model. */
class ApI
{
    public ?string $auth = null;
    public ?string $category = null;
    public ?string $cor = null;
    public ?string $description = null;
    public ?bool $http = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $status = null;
    public ?string $tested = null;
    public ?string $url = null;
}

/** Request payload for ApI#list. */
class ApIListMatch
{
    public ?string $auth = null;
    public ?string $category = null;
    public ?string $cor = null;
    public ?string $description = null;
    public ?bool $http = null;
    public ?string $id = null;
    public ?string $name = null;
    public ?string $status = null;
    public ?string $tested = null;
    public ?string $url = null;
}

