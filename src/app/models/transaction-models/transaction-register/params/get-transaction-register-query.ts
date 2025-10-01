import { BaseParam } from '../../../base/base-param';
import { TransactionRegisterDto } from '../dtos/transaction-register-dto';

export interface GetTransactionRegisterQuery extends BaseParam {
  transactionId: number;
}