import { BaseModel } from "../base/base-model";

export interface Person extends BaseModel {
  personIdc?: string;
  personCode?: string;
  personEnglishName?: string | null;
  personArabicName?: string | null;
  personShortName?: string | null;
  website?: string | null;
  personStatus?: number | null;
  private?: boolean;
  isSelectDisabled?:boolean;
}
