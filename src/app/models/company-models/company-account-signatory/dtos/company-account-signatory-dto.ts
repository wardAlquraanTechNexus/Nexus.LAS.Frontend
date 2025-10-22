export interface CompanyAccountSignatoryDto{
  id: number;
  companyBankAccountId: number;
  personId?: number | null;
  rule?: number | null;
  fromAmount?: number | null;   
  toAmount?: number | null;     
  description?: string | null;
  accountSignatoryDate?: string | null;
  accountSignatoryActive: boolean;
  cessationDate?: string | null;
  companyNameEn?:string | null;
  companyNameAr?:string | null;
}
