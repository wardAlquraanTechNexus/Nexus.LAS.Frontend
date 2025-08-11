export interface GetCompanyDto {
  id: number;
  companyIdc?: string;
  companyCode?: string;
  companyEnglishName?: string;
  companyArabicName?: string;
  companyShortName?: string;
  companyStatus: number;
  fpcCode: string;
  private: boolean;
}