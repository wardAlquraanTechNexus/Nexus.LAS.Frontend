import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../../models/transaction-models/transaction/transaction';
import { TransactionDto } from '../../models/transaction-models/transaction/dtos/transaction-dto';
import { Observable, shareReplay } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';
import { GetTransactionQuery } from '../../models/transaction-models/transaction/params/get-transaction-query';
import { BaseService } from '../base/base-service';
import { ExportModel } from '../../models/export-to-excel-dto';
import { BulkChangePrivateCommand } from '../../models/person-models/bulk-change-private-command';
import { BulkChangeStatusCommand } from '../../models/person-models/bulk-change-status-command';
import { AllTransactionDto } from '../../models/transaction-models/transaction/dtos/all-transaction-dto';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService<Transaction> {
  private transactionsRequest$?: Observable<AllTransactionDto[]>;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('Transaction');
  }

  getAllTransactions(transactionCode?: string): Observable<AllTransactionDto[]> {
    const params = this.httpParams({ transactionCode });
    if (!this.transactionsRequest$) {
      this.transactionsRequest$ = this.httpClient.get<AllTransactionDto[]>(this.url + "/GetAllByQuery", { params })
        .pipe(
          shareReplay(1)
        );
    }
    return this.transactionsRequest$;
  }
  getPaging(query: GetTransactionQuery): Observable<PaginateRsult<TransactionDto>> {
    const params = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<TransactionDto>>(this.url, { params });
  }

  getDtoById(id: number): Observable<TransactionDto> {
    return this.httpClient.get<TransactionDto>(this.url + "/" + id);
  }

  updateStatus(command: BulkChangeStatusCommand) {
    return this.httpClient.put<number>(this.url + "/BulkChangeStatus", command);
  }

  updatePrivate(command: BulkChangePrivateCommand) {
    return this.httpClient.put<number>(this.url + "/BulkChangePrivate", command);
  }

  exportToExcel(filter: any): Observable<ExportModel> {
    var params = this.httpParams(filter);
    return this.httpClient.get<ExportModel>(this.url + "/ExportToExcel", { params });
  }

  exportToPdf(filter: any): Observable<ExportModel> {
    var params = this.httpParams(filter);
    return this.httpClient.get<ExportModel>(this.url + "/ExportToPdf", { params });
  }

}