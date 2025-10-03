export interface TransactionRegisterDto {
  id: number;
  transactionId: number;
  registerIdc?: string | null;
  registerId?: number | null;
  primaryRegister?: boolean | null;
  registerTypes?: { idc: string, name: string } [] | null
}