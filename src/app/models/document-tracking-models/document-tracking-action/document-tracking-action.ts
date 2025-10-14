import { BaseEntity } from "../../base/base-entity";

export interface DocumentTrackingAction extends BaseEntity {
  id: number;
  documentTrackingId: number;
  actionType: string;
  actionDate: string; // ISO string for DateTime
  actionDescription?: string | null;
}