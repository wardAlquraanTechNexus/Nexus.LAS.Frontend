import { BaseEntity } from "../../base/base-entity";

export interface FPCODAction extends BaseEntity {
  fpcsOdsActionIdc: string;
  fpcOdIdn: number;
  actionType: number;
  actionDate: string; // ISO string for DateTime
  actionDescription?: string | null;
}