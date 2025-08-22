import { BaseEntity } from "../base/base-entity";

export interface Group extends BaseEntity{
    groupName:string,
    description:string
}