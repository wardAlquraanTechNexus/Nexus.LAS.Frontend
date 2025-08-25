import { BaseEntity } from "../../base/base-entity";

export interface CompanyLicense extends BaseEntity {
    id: number;
    companyIdn: number;
    licensePrimary: boolean;
    licenseStatus: string;
    licenseClassification: string;
    licenseNumber: string;
    licenseIssueDate: string;
    licenseExpiryDate?: string;
    licenseExpiryActiveReminder: boolean;
}