# FreePublicApis SDK feature factory

from freepublicapis_sdk.feature.base_feature import FreePublicApisBaseFeature
from freepublicapis_sdk.feature.ratelimit_feature import FreePublicApisRatelimitFeature
from freepublicapis_sdk.feature.retry_feature import FreePublicApisRetryFeature
from freepublicapis_sdk.feature.test_feature import FreePublicApisTestFeature
from freepublicapis_sdk.feature.timeout_feature import FreePublicApisTimeoutFeature


_FEATURES = {
    "base": lambda: FreePublicApisBaseFeature(),
    "ratelimit": lambda: FreePublicApisRatelimitFeature(),
    "retry": lambda: FreePublicApisRetryFeature(),
    "test": lambda: FreePublicApisTestFeature(),
    "timeout": lambda: FreePublicApisTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
