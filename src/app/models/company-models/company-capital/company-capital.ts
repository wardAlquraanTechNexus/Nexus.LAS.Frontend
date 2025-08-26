import { BaseEntity } from "../../base/base-entity";

export interface CompanyCapital extends BaseEntity {
    companyId: number;
    capitalDate?: string;       // Use string for DateTime (ISO format) in TypeScript
    capitalAmount?: number;
    nominalValueOfShare?: number;
    classOfShares?: string;
    numberOfShares?: number;
    capitalAuthorized?: number;
    capitalPaid?: number;
    issuedShares?: number;
    capitalCurrency?: string;
    capitalActive: boolean;
}