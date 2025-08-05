import { BaseModel } from "../base/base-model";

export interface User extends BaseModel{
    userIdc:string|null,
    Username:string|null,
    loginName:string|null,
    nTLogin:string|null,
    personsIdN:string|null,
}