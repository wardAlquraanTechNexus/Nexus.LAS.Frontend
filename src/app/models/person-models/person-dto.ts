import { CommonStatus } from "../../enums/common-status";

export interface PersonDto {
  id: number;
  personIdc?: string;
  personCode?: string;
  personEnglishName?: string;
  personArabicName?: string;
  personShortName?: string;
  personStatus: CommonStatus;
  nationality?: number | null;
  fpcCode: string;
  private: boolean;
  dateOfBirth?: Date | null;
  personImage?:  string | null; // depends on how you handle image
  contentType?:string;
  fileName:string;
}
