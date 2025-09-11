export interface CompanyPersonInChargeDto {
  id: number;
  companyIdn: number;
  personIdn?: number | null;
  designation?: string;
  designations?: string[];
  authorityRule?: number | null;
  notes?: string | null;
  personInChargeDate?: string; // or Date if you parse it
  cessationDate?: string | null;      // or Date
  personInChargeActive?: boolean;
  personNameEn?: string;
  personNameAr?: string;
  statusName?:string;
}
