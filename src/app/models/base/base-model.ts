export interface BaseModel {
    id?: number;
    createdBy?: string;
    creationDate?: string;
    modefiedBy?: string | null;
    modificationDate?: string | null;
}