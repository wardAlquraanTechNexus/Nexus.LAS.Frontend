import { EntityIDcType } from "../../../enums/entity-idc";
import { BaseEntity } from "../../base/base-entity";

export interface CompaniesShareHolder extends BaseEntity{
    id: number;
    shareHoldersGroupsId?: number;
    registersIdc: EntityIDcType; // Person or Company
    registersIdn: number; // Person or Company
    numbersOfShares?: number;
    shareHolderDate?: string; // ISO string
    cessationDate?: string;   // ISO string
    shareHolderActive?: boolean;
    companyId: number;
}