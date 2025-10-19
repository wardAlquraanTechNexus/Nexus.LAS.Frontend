export interface CompanyBoardMemberDto {
  id: number;
  personId?: number | null;
  position?: number | null;
  appointmentDate?: string | null; 
  cessationDate?: string | null;   
  isActive: boolean;
  companyId: number;
  companyNameEn?: string;
  companyNameAr?: string;
}