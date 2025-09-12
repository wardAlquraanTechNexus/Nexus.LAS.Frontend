export interface PersonIdDetailDto {
  id: number;
  personsIdn:number;
  type?: number | null;
  nationality?: number | null;
  placeOfIssue?: number | null;
  idNumber: string;
  idIssueDate: string;
  expiryDate: string;
  activeReminder?:boolean;
  isPrimary: boolean;
  fileName: string;
  contentType: string;
  dataFile: number[];
  imageUrl:any;
  file:any;
}