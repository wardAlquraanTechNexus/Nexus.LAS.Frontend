import { CommonStatus } from "../../../enums/common-status";
import { BaseEntity } from "../../base/base-entity";

export interface Transaction extends BaseEntity {
  id: number;
  transactionIdc: string;
  transactionDate?: string | null;
  transactionCode: string;
  subjectType?: number | null;
  subjectDescription?: string | null;
  status?: CommonStatus | null;
  private: boolean;
}