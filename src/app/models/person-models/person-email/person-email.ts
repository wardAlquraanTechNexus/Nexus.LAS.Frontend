import { BaseEntity } from "../../base/base-entity";

export interface PersonEmail extends BaseEntity{
    personsEmailIdc?:string,
    personsIdn?:number,
    emailPrimary?:boolean,
    email?:string
}