import { BaseModel } from "../base/base-model";

export interface DynamicList extends BaseModel
{
    id:number,
    linkedCategory:string | null,
    mainListId:number | null,
    menuCategory:string | null,
    menuValue:string,
    active:boolean | null,
    rank:number ,
}