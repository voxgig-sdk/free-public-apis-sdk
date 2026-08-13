# FreePublicApis SDK utility: make_context

from projectname_sdk.core.context import FreePublicApisContext


def make_context_util(ctxmap, basectx):
    return FreePublicApisContext(ctxmap, basectx)
