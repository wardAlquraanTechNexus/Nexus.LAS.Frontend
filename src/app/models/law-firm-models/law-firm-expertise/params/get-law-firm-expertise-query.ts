import { BaseParam } from "../../../base/base-param";

export interface GetLawFirmExpertiseQuery extends BaseParam {
  lawFirmId?: number | null;
  expertiseName?: string | null;
}