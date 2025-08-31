import { BaseEntity } from "../../base/base-entity";

export interface CompanyBankAccount extends BaseEntity {
    id: number;
    companyId: number;
    bankName: string;
    accountNumber: string;
    note?: string;
    bankAccountDate: string;
    bankAccountActive: boolean;
}