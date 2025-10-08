import { BaseEntity } from "../../base/base-entity";

export interface FPCOD extends BaseEntity{
  fpcOdIdc: string;
  fpcIdn: number;
  docType: number;
  description?: string | null;
}