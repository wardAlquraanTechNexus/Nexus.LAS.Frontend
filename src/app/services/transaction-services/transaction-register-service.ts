import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionRegister } from '../../models/transaction-models/transaction-register/transaction-register';
import { BaseService } from '../base/base-service';
import { TransactionRegisterDto } from '../../models/transaction-models/transaction-register/dtos/transaction-register-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable } from 'rxjs';
import { CreatePCTransactionRegisterCommand } from '../../models/transaction-models/transaction-register/params/create-pc-transaction-register';
import { GetTransactionRegisterByListIdcsQuery } from '../../models/transaction-models/transaction-register/params/get-transaction-register-query-by-list-idcs';
import { GetTransactionRegisterByQuery } from '../../models/transaction-models/transaction-register/params/get-transaction-register-by-query';

@Injectable({
  providedIn: 'root'
})
export class TransactionRegisterService extends BaseService<TransactionRegister> {
  constructor(protected http: HttpClient) {
    super(http);
    this.setPath('TransactionRegister');
  }

  getPagingByListIdcs(query: GetTransactionRegisterByListIdcsQuery): Observable<PaginateRsult<TransactionRegisterDto>> {
    const params = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<TransactionRegisterDto>>(this.url+"/GetPagingByListIdcs", { params });
  }

  getPaging(query: GetTransactionRegisterByQuery): Observable<PaginateRsult<TransactionRegisterDto>> {
    const params = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<TransactionRegisterDto>>(this.url, { params });
  }

  createPC(query: CreatePCTransactionRegisterCommand): Observable<number> {
    return this.httpClient.post<number>(this.url + "/CreatePCTransactionRegister", query);
  }
}