import { BaseEntity } from "../../base/base-entity";

export interface LawFirmPerson extends BaseEntity {
  id: number;
  lawFirmId: number;
  staffLevel?: number;
  name?: string;
  practice?: string;
  email?: string;
  phone?: string;
  staffStatus?: boolean;
}       