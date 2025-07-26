import { BaseParam } from "../base/base-param";

export interface GetPerdonOtherDocument extends BaseParam
{
    personIdn?: number | null;
    documentType?: string | null;
}