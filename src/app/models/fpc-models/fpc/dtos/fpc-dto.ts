import { CommonStatus } from "../../../../enums/common-status";

export interface FPCDto {
  id: number;
  fpcCode: string;
  registerIdc: string;
  registerIdn: number;
  fpcStatus: CommonStatus;
  private: boolean;
  createdBy?: string | null;
  createdAt?: string | null;
  modifiedBy?: string | null;
  modifiedAt?: string | null;
}
