import { BaseEntity } from "../../base/base-entity";

export interface CompanyActivity extends BaseEntity {
  id: number;
  activity: number;
  companyId: number;
}