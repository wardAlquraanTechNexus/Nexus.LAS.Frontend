import { BaseParam } from "../../../base/base-param";

export interface GetCompanyChamperOfCommerceParams extends BaseParam {
    id?: number;
    companyIdn?: number;
    cciNumber?: string;
    cciIssueDate?: Date;
    cciExpiryDate?: Date | null;
    cciExpiryActiveReminder?: boolean;
    cciUsername?: string;
    cciPassword?: string;
}