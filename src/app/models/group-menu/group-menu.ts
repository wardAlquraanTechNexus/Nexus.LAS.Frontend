import { BaseEntity } from "../base/base-entity";

export interface GroupMenu extends BaseEntity
{
    groupId:number;
    menuId:number;
    access:boolean;
    canInsert:boolean;
    canUpdate:boolean;
    canDelete:boolean;
    admin:boolean;
}