import { BaseEntity } from "../../base/base-entity";

export interface FPC extends BaseEntity {
  fpcIdc: string;
  fpcCode: string;
  registerIdc: string;
  registerIdn: number;
  fpcStatus: string;
  private: boolean;
}