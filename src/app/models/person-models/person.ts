import { BaseEntity } from "../base/base-entity";

export interface Person extends BaseEntity {
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
