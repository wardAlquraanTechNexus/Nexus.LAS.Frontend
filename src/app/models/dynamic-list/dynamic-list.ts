import { BaseModel } from "../base/base-model";

export interface DynamicList extends BaseModel
{
    id:number,
    parentId:number | null,
    name:string,
    active:boolean | null,
    rank:number ,
}