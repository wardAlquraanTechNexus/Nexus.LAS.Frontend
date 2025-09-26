import { BaseParam } from "../../../base/base-param";

export interface GetLawFirmQuery extends BaseParam {
    searchBy?: string;
    fid?: string;
    englishName?: string;
    arabicName?: string;
    shortName?: string;
    expertiseId?: number;
    countryId?: number;
    privates?: string;
    statuses?: string;
}
