import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionAction } from '../../models/transaction-models/transaction-action/transaction-action';
import { BaseService } from '../base/base-service';
import { GetTransactionActionParam } from '../../models/transaction-models/transaction-action/params/get-transaction-action-param';
import { PaginateRsult } from '../../models/paginate-result';
import { TransactionActionDto } from '../../models/transaction-models/transaction-action/dtos/transaction-dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionActionService extends BaseService<TransactionAction> {
  constructor(protected http: HttpClient) {
    super(http);
    this.setPath('TransactionAction');
  }

  getPaging(query: GetTransactionActionParam): Observable<PaginateRsult<TransactionActionDto>> {
    return this.http.get<PaginateRsult<TransactionActionDto>>(this.url, { params: this.httpParams(query) });
  }

  saveFollowUp(formData: FormData): Observable<any> {
    return this.http.post<number>(this.url, formData);
  }

  updateByBody(item: TransactionActionDto){
    return this.http.put<number>(this.url + "/updateByBody", item);
  }

  updateByForm(formData: FormData): Observable<any> {
    return this.http.put<number>(this.url + "/updateByForm", formData);
  }
}