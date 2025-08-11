import { BaseParam } from "../../base/base-param";

export interface GetUserParam extends BaseParam {
    username?:string | null;
    personsIdN:string|null,
}