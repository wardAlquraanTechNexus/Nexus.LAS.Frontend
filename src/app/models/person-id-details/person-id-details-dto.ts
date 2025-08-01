export interface PersonIdDetailDto {
  id: number;
  personsIdn:number;
  type: string;
  nationality: string;
  placeOfIssue: string;
  idNumber: string;
  idIssueDate: string;
  expiryDate: string;
  activeReminder?:boolean;
  isPrimary: boolean;
  fileName: string;
  contentType: string;
  dataFile: number[];
  imageUrl:any;
}