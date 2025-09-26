import { CommonStatus } from "../../../enums/common-status";
import { BaseEntity } from "../../base/base-entity";

export interface LawFirm extends BaseEntity
{
  id: number;
  lawFirmIdc: string;
  lawFirmCode: string;
  englishName: string;
  arabicName: string;
  shortName: string;
  status: CommonStatus;
  lasDate?: string | null;
  estYear?: number | null;
  website?: string | null;
  private: boolean;
}
