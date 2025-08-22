import { BaseEntity } from "../base/base-entity";

export interface PersonOtherDocument extends BaseEntity
{
    personIdn: number;
    documentType: string;
    documentDescription?: string;
}