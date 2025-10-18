import { BaseParam } from "../../../base/base-param";

export interface GetPagingCompanyContractQuery extends BaseParam {
  companyId: number;
  expiryDatePeriod?: number | null;
  activeReminder?: boolean | null;
}