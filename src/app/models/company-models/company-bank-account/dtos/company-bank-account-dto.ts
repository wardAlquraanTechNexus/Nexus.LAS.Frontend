export interface CompanyBankAccountDto {
  id: number;
  companyId: number;
  bankName: string;
  accountNumber: string;
  note?: string;
  bankAccountDate: string; 
  bankAccountActive: boolean;
}
