import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionRegister } from '../../models/transaction-models/transaction-register/transaction-register';
import { BaseService } from '../base/base-service';
import { GetTransactionRegisterQuery } from '../../models/transaction-models/transaction-register/params/get-transaction-register-query';
import { TransactionRegisterDto } from '../../models/transaction-models/transaction-register/dtos/transaction-register-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionRegisterService extends BaseService<TransactionRegister> {
  constructor(protected http: HttpClient) {
    super(http);
    this.setPath('TransactionRegister');
  }

  getPaging(query: GetTransactionRegisterQuery): Observable<PaginateRsult<TransactionRegisterDto>> {
    const params = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<TransactionRegisterDto>>(this.url, { params });
  }
}