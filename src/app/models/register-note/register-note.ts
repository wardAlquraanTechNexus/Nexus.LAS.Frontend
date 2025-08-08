import { BaseModel } from "../base/base-model";

export interface RegisterNote extends BaseModel {
  registersIdc: string;
  registersIdn: number;
  registersNotesText: string;
  noteDate: Date;
}
