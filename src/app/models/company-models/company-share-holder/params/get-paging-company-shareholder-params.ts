import { BaseParam } from "../../../base/base-param";

export interface GetPagingCompanyShareHolderParams extends BaseParam{
    companyId? : number | null;
    registersIdc? : string | null;
    registersIdn? : number | null;
}