import { BaseEntity } from "../base/base-entity";

export interface DynamicList extends BaseEntity
{
    id:number,
    parentId:number | null,
    name:string,
    active:boolean | null,
    rank:number ,
}