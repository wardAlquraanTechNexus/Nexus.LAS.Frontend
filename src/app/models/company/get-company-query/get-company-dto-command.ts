import { BaseParam } from "../../base/base-param";

export default interface GetCompanyQuery extends BaseParam {
  searchBy?: string | null;
  private?: boolean | null;
  status?: number | null;
  capitalAmount?:number | null;
  totalShares?:number | null;
  numberOfPartners?:number | null;
  companyTypeIdn?:number|null;
  companyClassIdn?:number|null;
  groupCompanyIdn?:number|null;
  relevantCompanyIdn?:number|null;
  legalTypeIdn?:number|null;
  placeOfRegistrationMainIdn?:number|null;
  placeOfRegistrationSubIdn?:number|null;

}