import { BaseParam } from "../../base/base-param";

export interface GetPersonOtherDocument extends BaseParam
{
    personsIdn?: number | null;
    documentType?: number | null;
}