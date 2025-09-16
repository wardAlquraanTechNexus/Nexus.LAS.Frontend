export interface CompanyCapitalDto {
    id: number;
    companyId: number;
    capitalDate?: string | null;
    capitalAmount?: number | null;
    nominalValueOfShare?: number | null;
    classOfShares?: string | null;
    numberOfShares?: number | null;
    capitalAuthorized?: number | null;
    capitalPaid?: number | null;
    issuedShares?: number | null;
    capitalCurrency?: string | null;
    capitalActive: boolean;
}
