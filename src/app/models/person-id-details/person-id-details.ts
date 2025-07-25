import { BaseModel } from "../base/base-model";

export interface PersonsIDDetail extends BaseModel {
  personsIDDetailIdc?: string;
  personsIdn?: number;
  isPrimary?: boolean;
  type?: string;
  nationality?: string;
  placeOfIssue?: string;
  idNumber?: string;
  idIssueDate?: string; // ISO string format (e.g., '2025-07-25T00:00:00')
  expiryDate?: string;
  activeReminder?: boolean;
}
