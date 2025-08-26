import { EntityIDcType } from "../../../../enums/entity-idc";

export interface CompaniesShareHolderDto {
  id: number;
  shareHoldersGroupsId?: number;
  registersIdc: EntityIDcType; // Person or Company
  registersIdn: number;
  numbersOfShares?: number;
  shareHolderDate?: string; // ISO string
  cessationDate?: string;   // ISO string
  shareHolderActive?: boolean;
  companyId: number;
}