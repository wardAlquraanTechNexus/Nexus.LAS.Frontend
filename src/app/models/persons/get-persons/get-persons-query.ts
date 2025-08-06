import { BaseParam } from "../../base/base-param";

export interface GetPersonsQuery extends BaseParam{
    searchBy?:string | null,
    nationality?:string | null,
    private?:boolean | null,
    status?:number | null,
    
}