import { BaseEntity } from "../../base/base-entity";

export interface CompanyBoardMember extends BaseEntity {
  id: number;
  personId: number;
  position: number;
  appointmentDate?: string | null; 
  cessationDate?: string | null;   
  isActive: boolean;
  companyId: number;
}