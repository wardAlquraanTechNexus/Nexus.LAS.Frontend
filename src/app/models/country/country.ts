import { BaseModel } from "../base/base-model";

export interface Country extends BaseModel {
  countryName?: string;
  fips104?: string;
  iso2?: string;
  iso3?: string;
  ison?: string;
  internet?: string;
  capital?: string;
  mapReference?: string;
  nationalitySingular?: string;
  nationalityPlural?: string;
  currency?: string;
  currencyCode?: string;
  population?: string;
  title?: string;
}