export interface SharedPropertyDTO {
  code: string;
  locationCountryId?: number | null;
  locationCityId?: number | null;
  locationAreaId?: number | null;
  relation?: number | null;
  typeOfTitle: number;
  type?: number | null;
  ownStartDate?: string | null; 
  ownActive?: boolean | null;
}
