import { BaseEntity } from "../../base/base-entity";

export interface GlobalDocumentExpiredDto extends BaseEntity {
  mainIdc: string;
  subIdc: string;
  mainType: string;
  subType: string;
  expiryPeriod: number;
  activeReminder: boolean;
  expiryDate: string;
}