import { EntityIDcType } from "../../../../enums/entity-idc";

export interface CompaniesShareHolderDto {
  id: number;
  shareHoldersGroupsId?: number | null;
  registersIdc: EntityIDcType; // Person or Company
  registersIdn?: number | null;
  numbersOfShares?: number | null;
  shareHolderDate?: string; // ISO string
  cessationDate?: string | null;   // ISO string
  shareHolderActive?: boolean;
  companyId: number;
  registerName?:string;
}