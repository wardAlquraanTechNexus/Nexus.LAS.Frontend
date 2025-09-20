export interface GetAllPropertiesQuery  {
    propertyId?: number | null;

    searchBy?: string | null;

    typeOfTitle?: number;
    locationCountryId?: number | null;
    locationCityId?: number | null;
    locationAreaId?: number | null;
    type?: number;
    purpose?: number;


    private?: string;   // comma-separated string (e.g. "true,false")

    status?: string;   // comma-separated string (e.g. "1,2,3")
}