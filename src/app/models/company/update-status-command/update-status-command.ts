import { CompanyStatus } from "../../../enums/company-status";

export interface BulkChangeCompanyStatusCommand{
    ids:number[],
    status:CompanyStatus
}