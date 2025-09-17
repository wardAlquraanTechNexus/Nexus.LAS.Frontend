
export interface CompanyChamberOfCommerceDTO {
  id: number;
  companyIdn: number;
  cciNumber: string;
  cciIssueDate: Date | null;
  cciExpiryDate?: Date | null;
  cciExpiryActiveReminder: boolean;
  cciUsername?: string;
  cciPassword?: string;
  contentType?: string;
  dataFile?: number[];
  imageUrl?: any;
  file?: any;
  fileName?: string;
}
