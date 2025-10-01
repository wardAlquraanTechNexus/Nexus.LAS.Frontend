import { BaseEntity } from "../../base/base-entity";

export interface TransactionRegister extends BaseEntity {
  id: number;
  transactionId: number;
  registerIdc: string;
  registerId: number;
  primaryRegister?: boolean | null;
}