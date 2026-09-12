import { FreePublicApisEntityBase } from '../FreePublicApisEntityBase';
import type { FreePublicApisSDK } from '../FreePublicApisSDK';
import type { Control } from '../types';
import type { ApI, ApIListMatch } from '../FreePublicApisTypes';
declare class ApIEntity extends FreePublicApisEntityBase<ApI> {
    constructor(client: FreePublicApisSDK, entopts: any);
    make(this: ApIEntity): ApIEntity;
    list(this: any, reqmatch?: ApIListMatch, ctrl?: Control): Promise<ApIEntity[]>;
}
export { ApIEntity };
