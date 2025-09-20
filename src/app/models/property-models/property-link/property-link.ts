import { BaseEntity } from "../../base/base-entity";

export interface PropertyLink extends BaseEntity
{
  registerIdc: string;
  registerIdn: number;
  propertyLinksValue: string;
  propertyLinksRemarks?: string;
}
