import { BaseParam } from "../../base/base-param";

export interface GetMenuParam extends BaseParam{
    id:number | null,
    name:string | null,
    path: string | null,
    parentId: number | null
}