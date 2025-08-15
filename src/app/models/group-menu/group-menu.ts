import { BaseModel } from "../base/base-model";

export interface GroupMenu extends BaseModel
{
    groupId:number;
    menuId:number;
    access:boolean;
    canInsert:boolean;
    canUpdate:boolean;
    canDelete:boolean;
    admin:boolean;
}