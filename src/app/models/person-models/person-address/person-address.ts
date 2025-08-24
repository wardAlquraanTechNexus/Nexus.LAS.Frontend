import { BaseEntity } from "../../base/base-entity";

export interface PersonAddress extends BaseEntity{
  id?: number;
  personsIdn: number;
  addressPrimary: boolean;
  addressLine1?: string | null;
  addressLine2?: string | null;
  addressLine3?: string | null;
  poBoxCity?: number | null;
  poBoxCountry?: number | null;
  poBoxNumber?:string | null
}
