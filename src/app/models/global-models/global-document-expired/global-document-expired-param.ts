import { BaseParam } from "../../base/base-param";

export interface GlobalExpiredDocumentQuery extends BaseParam{
    expiredPeriod:number;
}