import { BaseEntity } from "../../base/base-entity";

export interface CompanyPhone extends BaseEntity {
  id?: number;
  companyId?: number;
  phonePrimary?: boolean;
  phoneType?: string;
  phoneNumber?: string;
  phoneNumberNote?: string;
}