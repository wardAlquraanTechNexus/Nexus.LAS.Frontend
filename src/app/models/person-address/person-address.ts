import { BaseModel } from "../base/base-model";

export interface PersonAddress extends BaseModel{
  id?: number;
  personsIdn: number;
  addressPrimary?: boolean;
  addressLine1?: string;
  poBoxCity?: string | null;
  poBoxCountry?: string | null;
}
