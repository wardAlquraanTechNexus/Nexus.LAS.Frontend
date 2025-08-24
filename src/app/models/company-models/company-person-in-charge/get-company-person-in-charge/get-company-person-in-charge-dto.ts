export interface CompanyPersonInChargeDto {
  id: number;
  companyIdn: number;
  personIdn: number;
  designation?: string;
  authorityRule: string;
  notes?: string;
  personInChargeDate?: string; // or Date if you parse it
  cessationDate?: string;      // or Date
  personInChargeActive?: boolean;
  personNameEn: string;
  personNameAr: string;
}
