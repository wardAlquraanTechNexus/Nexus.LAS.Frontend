import { BaseEntity } from "../../base/base-entity";

export interface CompanyPersonInCharge extends BaseEntity
{
  companyPersonInChargeIdc: string;
  companyIdn: number;
  personIdn: number;
  designation?: string;
  authorityRule: string;
  notes?: string;
  personInChargeDate?: Date;
  cessationDate?: Date;
  personInChargeActive?: boolean;
}
