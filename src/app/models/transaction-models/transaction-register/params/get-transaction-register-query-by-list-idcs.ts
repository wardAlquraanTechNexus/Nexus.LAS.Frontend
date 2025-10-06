import { BaseParam } from '../../../base/base-param';
import { TransactionRegisterDto } from '../dtos/transaction-register-dto';

export interface GetTransactionRegisterByListIdcsQuery extends BaseParam {
  transactionId: number;
  registerIdcs?: string[];
}