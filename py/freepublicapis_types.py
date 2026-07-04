# Typed models for the FreePublicApis SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class ApI:
    auth: Optional[str] = None
    category: Optional[str] = None
    cor: Optional[str] = None
    description: Optional[str] = None
    http: Optional[bool] = None
    id: Optional[str] = None
    name: Optional[str] = None
    status: Optional[str] = None
    tested: Optional[str] = None
    url: Optional[str] = None


@dataclass
class ApIListMatch:
    auth: Optional[str] = None
    category: Optional[str] = None
    cor: Optional[str] = None
    description: Optional[str] = None
    http: Optional[bool] = None
    id: Optional[str] = None
    name: Optional[str] = None
    status: Optional[str] = None
    tested: Optional[str] = None
    url: Optional[str] = None

