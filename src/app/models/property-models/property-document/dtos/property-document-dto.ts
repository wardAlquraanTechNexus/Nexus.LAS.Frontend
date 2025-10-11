import { FileDto } from "../../../base/file-dto";

export interface PropertyDocumentDTO extends FileDto{
  id: number;
  propertyId?: number | null;
  type?: number | null;
  placeOfIssue?: string | null;
  issueDate?: string | null;
  documentExpiryDate?: string | null;
  activeReminder?: boolean | null;
  description?: string | null;
  removeFile?: boolean;
}
