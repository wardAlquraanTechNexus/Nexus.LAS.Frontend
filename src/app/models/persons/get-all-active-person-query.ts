import { BaseParam } from "../base/base-param";

export interface GetAllActivePersonQuery extends BaseParam{
    searchBy?:string | null,
    nationality?:string | null,
    private?:boolean | null
}