export interface PersonOtherDocumentDTO {
  id: number;
  personsIdn: number;
  documentType: string;
  documentDescription?: string | null;
  fileName?: string | null;
  contentType?: string | null;
  dataFile?: Uint8Array | null;  // or ArrayBuffer, depending on your usage
}
