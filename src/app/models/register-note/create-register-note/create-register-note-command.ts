export interface CreateRegisterNoteCommand {
  registersIdc: string;
  registersIdn: number;
  registersNotesText: string;
  noteDate: Date;
}
