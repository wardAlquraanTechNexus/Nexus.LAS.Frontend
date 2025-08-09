import { BaseParam } from "../base/base-param";

export interface GetDynamicListParam extends BaseParam{
    mainListId:number | null,
    id:number|null
}