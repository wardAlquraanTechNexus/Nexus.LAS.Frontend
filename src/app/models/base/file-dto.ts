export interface FileDto {
    fileName?: string | null;
    contentType?: string | null;
    dataFile?: Uint8Array | null;
    imageUrl?: any | null;
    file:any;
    fileId?: number | null;
    data?: string | null;
}