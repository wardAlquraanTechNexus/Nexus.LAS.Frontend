import { CompanyLicenseStatus } from "../../../../enums/company-license-status";

export interface CompanyLicenseDto {
  id: number;
  companyIdn: number;
  licensePrimary: boolean;
  licenseStatus?: CompanyLicenseStatus;
  licenseClassification: string;
  licenseNumber: string;
  licenseIssueDate: string;
  licenseExpiryDate?: string;
  licenseExpiryActiveReminder: boolean;
  contentType?: string;
  dataFile?: number[];
  imageUrl?: any;
  file?: any;
  fileName?: string;
}
