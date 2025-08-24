import { BaseEntity } from "../../base/base-entity";

export interface PersonPhone extends BaseEntity {
    personsPhoneIdc?: string;
    id?: number;
    personsIdn?: number;
    phonePrimary?: boolean;
    phoneType?: number;
    phoneNumber?: string;
}