import { BaseParam } from "../../base/base-param";

export interface GetRegisterNoteParam extends BaseParam{
    id?:number,
    registersIdc:string,
    registersIdn:number,
}