import { BaseEntity } from "../base/base-entity";

export interface UserGroup extends BaseEntity{
    userId:number,
    groupId:number
}