import { BaseEntity } from "../base/base-entity";

export interface User extends BaseEntity{
    userIdc:string,
    username:string,
    loginName:string|null,
    nTLogin:string|null,
    personsIdN:string|null,
}