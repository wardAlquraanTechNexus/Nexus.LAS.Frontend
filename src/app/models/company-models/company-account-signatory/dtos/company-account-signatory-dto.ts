export interface CompanyAccountSignatoryDto{
  id: number;
  companyBankAccountId: number;
  personId?: number | null;
  rule?: number | null;
  fromAmount: number;   
  toAmount: number;     
  description: string;  
  accountSignatoryDate: string;
  accountSignatoryActive: boolean;
  cessationDate?: string | null;
  companyNameEn?:string;
  companyNameAr?:string;
}
