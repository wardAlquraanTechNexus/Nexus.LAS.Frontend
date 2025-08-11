import { BaseParam } from "../../base/base-param";

export default interface GetCompanyQuery extends BaseParam {
  searchBy?: string | null;
  private?: boolean | null;
  status?: number | null;
}