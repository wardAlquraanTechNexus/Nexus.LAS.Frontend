import { CommonStatus } from "../../../../enums/common-status";

export interface TransactionDto {
  id: number;
  transactionDate?: string | null;
  transactionCode: string;
  subjectType?: number | null;
  subjectDescription?: string | null;
  status?: CommonStatus | null;
  private: boolean;
  createdBy?: string | null;
  createdAt?: string | null;
  modifiedBy?: string | null;
  modifiedAt?: string | null;
}