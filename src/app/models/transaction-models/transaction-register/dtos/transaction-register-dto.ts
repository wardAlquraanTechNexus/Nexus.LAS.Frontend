export interface TransactionRegisterDto {
  id: number;
  transactionId: number;
  transactionNumber?: string | null;
  transactionDate?: string | null;
  transactionSubjectDecription?: string | null;
  subjectType?: number | null;
  registerIdc?: string | null;
  registerId?: number | null;
  primaryRegister?: boolean | null;
  companyId?: number | null;
  personId?: number | null;
  registerTypes?: { idc: string, name: string }[] | null;
  addLabel?: string;
  editLabel?: string;
  enterDetailsLabel?: string;
  icon?: string;
}