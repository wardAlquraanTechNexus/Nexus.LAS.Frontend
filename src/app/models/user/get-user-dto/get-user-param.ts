import { BaseParam } from "../../base/base-param";

export interface GetUserParam extends BaseParam {
    username?:string | null;
    email?:string | null;
    firstName?:string | null;
    lastName?:string | null;
    personsIdN:string|null,
}