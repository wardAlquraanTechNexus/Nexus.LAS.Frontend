import { CompanyLicenseStatus } from "../../../../enums/company-license-status";
import { FileDto } from "../../../base/file-dto";

export interface CompanyLicenseDto extends FileDto{
  id: number;
  companyIdn: number;
  licensePrimary: boolean;
  licenseStatus?: CompanyLicenseStatus;
  licenseClassification?: number | null;
  licenseNumber?: string | null;
  licenseIssueDate: string | null;
  licenseExpiryDate?: string | null;
  licenseExpiryActiveReminder: boolean;
  removeFile?: string | null;
}
