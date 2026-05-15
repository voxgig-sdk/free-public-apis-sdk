package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewApIEntityFunc func(client *FreePublicApisSDK, entopts map[string]any) FreePublicApisEntity

