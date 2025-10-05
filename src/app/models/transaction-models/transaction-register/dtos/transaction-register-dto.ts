export interface TransactionRegisterDto {
  id: number;
  transactionId: number;
  registerIdc?: string | null;
  registerId?: number | null;
  primaryRegister?: boolean | null;
  companyId?: number | null;
  personId?: number | null;
  registerTypes?: { idc: string, name: string }[] | null
}