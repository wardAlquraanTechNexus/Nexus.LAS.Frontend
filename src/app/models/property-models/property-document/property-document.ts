import { BaseEntity } from "../../base/base-entity";

export interface PropertyDocument extends BaseEntity {
  id: number;
  propertyId?: number | null;
  type?: number | null;
  placeOfIssue?: string | null;
  issueDate?: string | null;
  documentExpiryDate?: string | null;
  activeReminder?: boolean | null;
  description?: string | null;
  fileName?: string | null;
  contentType?: string | null;
  dataFile?: string | null;
}
