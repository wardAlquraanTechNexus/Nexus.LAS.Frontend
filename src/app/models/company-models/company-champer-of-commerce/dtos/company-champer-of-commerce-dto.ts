import moment from "moment";

export interface CompanyChamberOfCommerceDTO {
  id: number;
  companyIdn: number;
  cciNumber: string;
  cciIssueDate: moment.Moment | null;
  cciExpiryDate?: moment.Moment | null;
  cciExpiryActiveReminder: boolean;
  cciUsername?: string;
  cciPassword?: string;
  contentType?: string;
  dataFile?: number[];
  imageUrl?: any;
  file?: any;
  fileName?: string;
}
