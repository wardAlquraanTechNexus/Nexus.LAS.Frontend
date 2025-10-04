import { BaseParam } from "../../../base/base-param";

export interface GetTransactionInvoiceParam extends BaseParam {
  transactionId?: number | null;
  lawFirmId?: number | null;
}