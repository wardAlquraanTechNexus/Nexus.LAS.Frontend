export interface CreatePCTransactionRegisterCommand {
  transactionId: number;
  companyId: number;
  personId: number;
  primaryRegister: boolean;
}