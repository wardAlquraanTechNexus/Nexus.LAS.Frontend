import { BaseModel } from "../../base/base-model";

export interface PersonPhone extends BaseModel {
    personsPhoneIdc?: string;
    id?: number;
    personsIdn?: number;
    phonePrimary?: boolean;
    phoneType?: number;
    phoneNumber?: string;
}