import { BaseEntity } from "../../base/base-entity";

export interface CompanyBoard extends BaseEntity {
  id: number;
  companyId: number;
  boardDate: string; 
  boardActive: boolean;
}