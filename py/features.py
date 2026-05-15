# FreePublicApis SDK feature factory

from feature.base_feature import FreePublicApisBaseFeature
from feature.test_feature import FreePublicApisTestFeature


def _make_feature(name):
    features = {
        "base": lambda: FreePublicApisBaseFeature(),
        "test": lambda: FreePublicApisTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
