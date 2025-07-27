export interface PersonIdDetailDto {
  id: number;
  type: string;
  nationality: string;
  placeOfIssue: string;
  idNumber: string;
  idIssueDate: string;
  expiryDate: string;
  isPrimary: boolean;
  fileName: string;
  contentType: string;
  dataFile: number[];
}