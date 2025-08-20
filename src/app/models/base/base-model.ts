export interface BaseModel {
    id?: number;
    createdBy?: string;
    createdAt?: string;
    modifiedBy?: string | null;
    modifiedAt?: string | null;
}