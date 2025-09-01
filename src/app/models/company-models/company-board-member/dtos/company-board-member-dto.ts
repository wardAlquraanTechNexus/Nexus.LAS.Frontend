export interface CompanyBoardMemberDto {
  id: number;
  personId: number;
  position: number;
  appointmentDate?: string | null; 
  cessationDate?: string | null;   
  isActive: boolean;
  companyBoardId: number;
}