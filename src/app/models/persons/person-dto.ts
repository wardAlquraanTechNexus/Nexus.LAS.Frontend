export interface PersonDto {
  id: number;
  personIdc?: string;
  personCode?: string;
  personEnglishName?: string;
  personArabicName?: string;
  personShortName?: string;
  personStatus: number;
  fpcCode: string;
  private: boolean;
  personImage?:  string | null; // depends on how you handle image
  contentType?:string;
  fileName:string;
}
