import { BaseEntity } from "../../base/base-entity";

export interface Property extends BaseEntity {
  propertyIdc: string;
  id: number;
  code: string;

  typeOfTitle?: string;
  grantor?: boolean;
  grantorAddress?: string;
  grantorTitleCommencementDate?: string; // use string to hold ISO date from API
  grantorTitleExpiryDate?: string;
  grantorTitleExpiryActiveReminder?: boolean;
  grantorDescription?: string;

  locationCountryId?: number;
  locationCityId?: number;
  locationAreaId?: number;
  locationDetails?: string;

  type?: number;
  purpose?: number;
  statuses?: string; // comma-separated values

  private: boolean;

  plot?: string;
  plotFArea?: string;
  plotMArea?: string;
  propertyFArea?: string;
  propertyMArea?: string;
}