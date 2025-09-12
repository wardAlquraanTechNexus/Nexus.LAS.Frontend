import { FileDto } from "../../base/file-dto";

export interface PersonOtherDocumentDTO extends FileDto {
  id: number;
  personsIdn: number;
  documentType: number;
  documentDescription?: string | null;
}
