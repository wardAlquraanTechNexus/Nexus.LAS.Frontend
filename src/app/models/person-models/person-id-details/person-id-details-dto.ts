import { FileDto } from "../../base/file-dto";

export interface PersonIdDetailDto extends FileDto {
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
  removeFile:boolean;
}