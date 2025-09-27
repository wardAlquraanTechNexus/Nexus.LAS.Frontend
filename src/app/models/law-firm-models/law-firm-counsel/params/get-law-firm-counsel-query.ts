import { BaseParam } from "../../../base/base-param";

export interface GetLawFirmCounselQuery extends BaseParam {
  lawFirmId?: number;
  counselName?: string | null;
}