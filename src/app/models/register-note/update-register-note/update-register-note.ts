export interface UpdateRegisterNoteCommand {
  id: number;
  registersIdc: string;
  registersIdn: number;
  registersNotesText: string;
  noteDate: Date;
}
