import { CommonStatus } from "../../../../enums/common-status";
import { BaseParam } from "../../../base/base-param";

export interface GetFPCParam extends BaseParam {
  searchBy?: string | null;
  private?: string | null;
  privates?: boolean[];
  status?: string | null;
  statuses?: CommonStatus[];
}