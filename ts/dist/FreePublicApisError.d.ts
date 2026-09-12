import { Context } from './Context';
declare class FreePublicApisError extends Error {
    isFreePublicApisError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { FreePublicApisError };
