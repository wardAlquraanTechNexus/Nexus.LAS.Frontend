import { BaseModel } from "../base/base-model";

export interface PersonOtherDocument extends BaseModel
{
    personIdn: number;
    documentType: string;
    documentDescription?: string;
}