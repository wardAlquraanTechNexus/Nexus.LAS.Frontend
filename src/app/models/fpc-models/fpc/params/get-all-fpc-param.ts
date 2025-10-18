import { CommonStatus } from "../../../../enums/common-status";

export interface GetAllFPCParam  {
  searchBy?: string | null;
  private?: string | null;
  privates?: boolean[];
  status?: string | null;
  statuses?: CommonStatus[];
}