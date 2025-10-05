import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransactionInvoice } from '../../models/transaction-models/transaction-invoice/transaction-invoice';
import { GetTransactionInvoiceParam } from '../../models/transaction-models/transaction-invoice/params/get-transaction-invoice-param';
import { BaseService } from '../base/base-service';
import { TransactionInvoiceDto } from '../../models/transaction-models/transaction-invoice/dtos/transaction-invoice-dto';
import { PaginateRsult } from '../../models/paginate-result';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionInvoiceService extends BaseService<TransactionInvoice> {
  constructor(http: HttpClient) {
    super(http);
    this.setPath('TransactionInvoice');
  }

  getPaging(query: GetTransactionInvoiceParam): Observable<PaginateRsult<TransactionInvoiceDto>> {
    return this.httpClient.get<PaginateRsult<TransactionInvoiceDto>>(this.url, { params: this.httpParams(query) });
  }

  createByForm(formData: FormData): Observable<number> {
    return this.httpClient.post<number>(this.url + "/CreateByForm", formData);
  }
  updateByForm(formData: FormData): Observable<number> {
    return this.httpClient.put<number>(this.url + "/UpdateByForm", formData);
  }
}
