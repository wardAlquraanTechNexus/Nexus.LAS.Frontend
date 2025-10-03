import { BaseEntity } from "../../base/base-entity";
import { TransactionActionStatus } from "./enums/transaction-action-status";

export interface TransactionAction extends BaseEntity {
  id: number;
  transactionId: number;
  personId?: number | null;
  time?: number | null;
  description: string;
  dueDate: string;
  closedDate?: string | null;
  actionStatus: TransactionActionStatus;
}