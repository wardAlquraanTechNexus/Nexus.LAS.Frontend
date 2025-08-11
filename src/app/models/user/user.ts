import { BaseModel } from "../base/base-model";

export interface User extends BaseModel{
    userIdc:string,
    username:string,
    loginName:string|null,
    nTLogin:string|null,
    personsIdN:string|null,
}