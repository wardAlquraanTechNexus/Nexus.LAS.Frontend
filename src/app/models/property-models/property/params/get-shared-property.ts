import { EntityIDc } from "../../../../enums/entity-idc";
import { BaseParam } from "../../../base/base-param";

export interface GetSharedPropertyParams extends BaseParam{
    idc? : EntityIDc | null;
    idn? : number | null;    
}