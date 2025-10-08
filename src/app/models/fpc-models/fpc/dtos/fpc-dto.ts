import { CommonStatus } from "../../../../enums/common-status";

export interface FPCDto {
  id: number;
  fpcCode: string;
  registerIdc: string;
  registerIdn: number;
  fpcStatus: CommonStatus;
  private: boolean;
  registerEnglishName?: string | null;
  registerArabicName?: string | null;
  registerShortName?: string | null;
  registerCode?: string | null;
  createdBy?: string | null;
  createdAt?: string | null;
  modifiedBy?: string | null;
  modifiedAt?: string | null;
}
