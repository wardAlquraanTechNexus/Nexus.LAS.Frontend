import { BaseParam } from "../base/base-param";

export interface GetPersonIdDetailsParams extends BaseParam {
  type?: string | null;
  nationality?: string | null;
  personsIdn: number;
}