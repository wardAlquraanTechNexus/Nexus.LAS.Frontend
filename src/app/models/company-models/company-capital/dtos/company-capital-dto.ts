export interface CompanyCapitalDto {
    id: number;
    companyId: number;
    capitalDate?: string;
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
