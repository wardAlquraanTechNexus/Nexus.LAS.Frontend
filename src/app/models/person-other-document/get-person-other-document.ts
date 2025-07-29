import { BaseParam } from "../base/base-param";

export interface GetPerdonOtherDocument extends BaseParam
{
    personsIdn?: number | null;
    documentType?: string | null;
}