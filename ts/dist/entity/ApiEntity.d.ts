import { FreePublicApisEntityBase } from '../FreePublicApisEntityBase';
import type { FreePublicApisSDK } from '../FreePublicApisSDK';
import type { Control } from '../types';
import type { Api, ApiListMatch } from '../FreePublicApisTypes';
declare class ApiEntity extends FreePublicApisEntityBase<Api> {
    constructor(client: FreePublicApisSDK, entopts: any);
    make(this: ApiEntity): ApiEntity;
    list(this: any, reqmatch?: ApiListMatch, ctrl?: Control): Promise<ApiEntity[]>;
}
export { ApiEntity };
