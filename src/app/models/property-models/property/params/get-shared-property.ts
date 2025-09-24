import { BaseParam } from "../../../base/base-param";

export interface GetSharedPropertyParams extends BaseParam{
    idc? : string | null;
    idn? : number | null;    
}