import { BaseParam } from "../../../base/base-param";

export interface GetTransactionRegisterByQuery extends BaseParam {
    transactionId?: string;
    registerIdc?: string;
    registerId?: number
}