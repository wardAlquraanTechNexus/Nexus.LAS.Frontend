export interface GetCompanyDto {
  id: number;
  companyCode?: string | null;
  companyEnglishName?: string | null;
  companyArabicName?: string | null;
  companyShortName?: string | null;
  companyStatus: number;
  companyTypeIdn?: number | null;
  companyClassIdn?: number | null;
  groupCompanyIdn?: number | null;
  relevantCompanyIdn?: number | null;
  legalTypeIdn?: number | null;
  cciNumber?: string | null;
  cciIssueDate?: string | null;   // ISO string when coming from API
  cciExpiryDate?: string | null;  // same here
  cciExpiryActiveReminder?: boolean | null;
  placeOfRegistrationMainIdn?: number | null;
  placeOfRegistrationSubIdn?: number | null;
  capitalAmount?: number | null;
  totalShares?: number | null;
  numberOfPartners?: number | null;
  updateDate?: string | null;     // DateTime → string from API
  updateDescription?: string | null;
  personsIdn?: number | null;
  fpcCode?: string | null;
  private: boolean;
}