import { BaseEntity } from "../../base/base-entity";

export interface DocumentTracking extends BaseEntity {
  documentTrackingIdc: string;
  id: number;
  documentTrackingCode: string;
  referenceNumber?: string;
  personId: number;
  registerIdc: string;
  registerIdn: number;
  description?: string;
}