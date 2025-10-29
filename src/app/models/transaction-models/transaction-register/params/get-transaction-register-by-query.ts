import { EntityIDc } from "../../../../enums/entity-idc";
import { BaseParam } from "../../../base/base-param";

export interface GetTransactionRegisterByQuery extends BaseParam {
    transactionId?: string;
    registerIdc?: EntityIDc;
    registerId?: number
}