import { BaseModel } from "../base/base-model";

export interface PersonAddress extends BaseModel{
  id?: number;
  personsIdn: number;
  addressPrimary: boolean;
  addressLine1?: string | null;
  addressLine2?: string | null;
  addressLine3?: string | null;
  poBoxCity?: string | null;
  poBoxCountry?: string | null;
  poBoxNumber?:string | null
}
