import { EntityIDc } from "../../../../enums/entity-idc";
import { BaseParam } from "../../../base/base-param";

export interface GetPagingCompanyShareHolderParams extends BaseParam{
    companyId? : number | null;
    registersIdc? : EntityIDc | null;
    registersIdn? : number | null;
}