import { FileDto } from "../../../base/file-dto";

export interface CompanyChamberOfCommerceDTO extends FileDto{
  id: number;
  companyIdn: number;
  cciNumber: string;
  cciIssueDate: Date | null;
  cciExpiryDate?: Date | null;
  cciExpiryActiveReminder: boolean;
  cciUsername?: string;
  cciPassword?: string;
  contentType?: string;
}
