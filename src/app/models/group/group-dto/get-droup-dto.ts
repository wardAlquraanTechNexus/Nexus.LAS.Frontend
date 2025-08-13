import { BaseParam } from "../../base/base-param";

export interface GetGroupDTOQuery extends BaseParam{
    groupName?:string | null,
    id?:number | null;
}