import { CompanyLicenseStatus } from "../../../../enums/company-license-status";
import { FileDto } from "../../../base/file-dto";

export interface CompanyLicenseDto extends FileDto{
  id: number;
  companyIdn: number;
  licensePrimary: boolean;
  licenseStatus?: CompanyLicenseStatus;
  licenseClassification: string;
  licenseNumber: string;
  licenseIssueDate: string;
  licenseExpiryDate?: string;
  licenseExpiryActiveReminder: boolean;
  removeFile?: string | null;
}
