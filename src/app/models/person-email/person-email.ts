import { BaseModel } from "../base/base-model";

export interface PersonEmail extends BaseModel{
    personsEmailIdc?:string,
    personsIdn?:number,
    emailPrimary?:boolean,
    email?:string
}