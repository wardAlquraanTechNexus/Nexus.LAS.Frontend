import { BaseParam } from "../base/base-param";

export interface GetDynamicListParam extends BaseParam{
    parentId:number | null,
    id:number|null,
    name:string|null
}