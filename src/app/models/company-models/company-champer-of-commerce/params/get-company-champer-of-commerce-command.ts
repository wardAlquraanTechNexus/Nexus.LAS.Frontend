import { BaseParam } from "../../../base/base-param";

export interface GetCompanyChamperOfCommerceParams extends BaseParam {
    id?: number;
    companyIdn?: number;
    cciNumber?: string;
    cciIssueDate?: Date;
    cciExpiryDatePeriod?: number | null;
    cciExpiryActiveReminder?: boolean | null;
    cciUsername?: string;
    cciPassword?: string;
}