import { EntityIDc } from "../../../enums/entity-idc";
import { BaseParam } from "../../base/base-param";

export interface GetRegisterNoteParam extends BaseParam{
    id?:number,
    registersIdc:EntityIDc,
    registersIdn:number,
}