import { BaseModel } from "../base/base-model";

export interface Group extends BaseModel{
    groupName:string,
    description:string
}