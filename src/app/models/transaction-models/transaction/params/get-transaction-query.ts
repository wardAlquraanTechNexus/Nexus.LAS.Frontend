import { CommonStatus } from "../../../../enums/common-status";
import { BaseParam } from "../../../base/base-param";

export interface GetTransactionQuery extends BaseParam{
  searchBy?: string | null;
  private?: string | null; // comma-separated string of booleans, e.g. "true,false"
  privates?: boolean[] | null; // array of booleans
  status?: string | null; // comma-separated string of statuses
  statuses?: CommonStatus[] | null;
  transactionDateFrom?: Date | string | null;
  transactionDateTo?: Date | string | null;
  transactionCode?: string | null;
  subjectType?: number | null;
  subjectDescription?: string | null;
}