import { BaseEntity } from "../../base/base-entity";

export interface CompanyContract extends BaseEntity {
  id: number;
  companiesContractIdc: string;
  companyId: number;
  contractType: number;
  documentDate?: string;
  commencementDate?: string;
  contractExpiryDate?: string;
  contractExpiryActiveReminder?: boolean;
  contractDescription?: string;
  contractStatus: number;
}
