export interface PropertyOwnerDTO {
  id: number;
  propertyId: number;
  registerIdc: string | null;  
  registerIdn: number | null;
  relation?: number | null;
  ownStartDate?: string | null;   // dates from API usually come as ISO strings
  ownFinishDate?: string | null;
  ownActive?: boolean | null;
  remarks?: string | null;
}
