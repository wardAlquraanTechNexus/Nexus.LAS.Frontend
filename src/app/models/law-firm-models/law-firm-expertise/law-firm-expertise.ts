import { BaseEntity } from "../../base/base-entity";

export interface LawFirmExpertise extends BaseEntity
{
  id: number;
  lawFirmsExpertiseIdc: string;
  lawFirmId: number;
  expertiseName: string;
}