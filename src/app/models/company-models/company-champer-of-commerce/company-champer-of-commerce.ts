import { BaseEntity } from "../../base/base-entity";

export interface CompanyChamberOfCommerce extends BaseEntity
{
  id: number;
  companyIdn: number;
  cciNumber: string;
  cciIssueDate: Date;
  cciExpiryDate?: Date | null;
  cciExpiryActiveReminder: boolean;
  cciUsername?: string;
  cciPassword?: string;
}
