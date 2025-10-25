import { BaseEntity } from "../base/base-entity";

export interface RegisterNote extends BaseEntity {
  registersIdc: string;
  registersIdn: number;
  registersNotesText: string;
  noteDate: string | Date;
}
