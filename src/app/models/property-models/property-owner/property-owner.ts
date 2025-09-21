import { BaseEntity } from "../../base/base-entity";

export interface PropertyOwner extends BaseEntity {
  id: number;
  propertyId: number;
  registerIdc: string;
  registerIdn: number;
  relation?: number | null;
  ownStartDate?: string | null;
  ownFinishDate?: string | null;
  ownActive?: boolean | null;
  remarks?: string | null;
}
