import { FileDto } from "../../../base/file-dto";
import { TransactionActionStatus } from "../enums/transaction-action-status";

export interface TransactionActionDto {
  id: number;
  transactionId: number;
  personId?: number | null;
  time?: number | null;
  description: string;
  dueDate?: string | null;
  closedDate?: string | null;
  actionStatus?: string | null;
  files: FileDto[];
  fileIdsToRemove?: number[];
}
