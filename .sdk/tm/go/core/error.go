package core

type FreePublicApisError struct {
	IsFreePublicApisError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewFreePublicApisError(code string, msg string, ctx *Context) *FreePublicApisError {
	return &FreePublicApisError{
		IsFreePublicApisError: true,
		Sdk:              "FreePublicApis",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *FreePublicApisError) Error() string {
	return e.Msg
}
