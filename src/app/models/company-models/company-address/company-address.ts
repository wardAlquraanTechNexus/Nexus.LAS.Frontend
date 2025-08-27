import { BaseEntity } from "../../base/base-entity";

export interface CompanyAddress extends BaseEntity {
  id: number;
  companyId: number;
  addressPrimary: boolean;
  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  poBoxNumber?: string;
  poBoxCity?: number;
  poBoxCountry: number;
}