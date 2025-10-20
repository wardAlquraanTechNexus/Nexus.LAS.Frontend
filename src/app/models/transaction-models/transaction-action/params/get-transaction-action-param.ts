import { BaseParam } from "../../../base/base-param";
import { TransactionActionStatus } from "../enums/transaction-action-status";

export interface GetTransactionActionParam extends BaseParam {
  transactionId?: number | null;
  personId?: number | null;
  statuses?: TransactionActionStatus[] | null;
}