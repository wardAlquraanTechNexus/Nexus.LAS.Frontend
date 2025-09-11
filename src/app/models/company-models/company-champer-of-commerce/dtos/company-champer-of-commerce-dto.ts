export interface CompanyChamberOfCommerceDTO {
  id: number;
  companyIdn: number;
  cciNumber: string;
  cciIssueDate: string;
  cciExpiryDate?: string;
  cciExpiryActiveReminder: boolean;
  cciUsername?: string;
  cciPassword?: string;
  contentType?: string;
  dataFile?: number[];
  imageUrl?: any;
  file?: any;
  fileName?: string;
}
