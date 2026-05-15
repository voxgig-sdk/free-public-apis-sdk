# FreePublicApis SDK utility: make_context

from core.context import FreePublicApisContext


def make_context_util(ctxmap, basectx):
    return FreePublicApisContext(ctxmap, basectx)
