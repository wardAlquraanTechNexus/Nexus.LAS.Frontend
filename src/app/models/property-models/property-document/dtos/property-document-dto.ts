export interface PropertyDocumentDTO {
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
  dataFile?: any | null;
  removeFile?: boolean;
  file:any;
  imageUrl:any;
}
