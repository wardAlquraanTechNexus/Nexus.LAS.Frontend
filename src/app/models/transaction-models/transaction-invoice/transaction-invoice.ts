import { BaseEntity } from "../../base/base-entity";

export interface TransactionInvoice extends BaseEntity {
  transactionsInvoiceIdc: string;
  id: number;
  transactionId: number;
  lawFirmId: number;
  invoice?: string | null;
  invoiceDate?: string | null;
  amount?: number | null;
  paid?: number | null;
  currency?: number | null;
  note: string;
}