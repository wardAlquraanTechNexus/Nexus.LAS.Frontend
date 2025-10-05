import { FileDto } from "../../../base/file-dto";

export interface TransactionInvoiceDto extends FileDto {
  id: number;
  transactionId: number;
  transactionNumber?: string | null;
  lawFirmId: number | null;
  invoice?: string | null;
  invoiceDate?: string | null; 
  amount?: string | null;
  paid?: string | null;
  currency?: number | null;
  note?: string | null;
}