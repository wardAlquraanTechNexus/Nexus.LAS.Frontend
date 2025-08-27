import { BaseEntity } from "../../base/base-entity";

export interface CompanyEmail extends BaseEntity {
  id: number;
  email: string;
  emailPrimary: boolean;
  companyId: number;
}