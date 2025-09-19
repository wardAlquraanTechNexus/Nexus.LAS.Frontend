import { CompanyStatus } from "../../../enums/company-status";

export interface BulkChangeStatusCommand{
    ids:number[],
    status:number
}