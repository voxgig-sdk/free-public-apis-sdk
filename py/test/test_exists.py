# ProjectName SDK exists test

import pytest
from freepublicapis_sdk import FreePublicApisSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = FreePublicApisSDK.test(None, None)
        assert testsdk is not None
