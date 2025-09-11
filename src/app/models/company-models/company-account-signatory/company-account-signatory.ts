export interface CompanyAccountSignatory{
  id: number;
  companyBankAccountId: number;
  personId: number;
  rule: number;
  fromAmount: number;   
  toAmount: number;     
  description: string;  
  accountSignatoryDate: string;
  accountSignatoryActive: boolean;
  cessationDate?: string | null;
}
