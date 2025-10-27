import { BaseParam } from "../../base/base-param";

export interface SearchGroupMenuQuery extends BaseParam
{
    menuId?:number | null,
    groupId?:number | null,
    menuName?:number | null,
    groupName?:number | null,
}