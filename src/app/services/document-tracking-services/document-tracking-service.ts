import { Injectable } from '@angular/core';
import { DocumentTracking } from '../../models/document-tracking-models/document-tracking/document-tracking';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentTrackingDto } from '../../models/document-tracking-models/document-tracking/dtos/document-tracking-dto';
import { BaseService } from '../base/base-service';
import { PaginateRsult } from '../../models/paginate-result';
import { GetPagingDocumentTrackingQuery } from '../../models/document-tracking-models/document-tracking/params/get-paging-document-tracking-param';
import { BulkChangeStatusCommand } from '../../models/person-models/bulk-change-status-command';
import { BulkChangePrivateCommand } from '../../models/person-models/bulk-change-private-command';
import { ExportModel } from '../../models/export-to-excel-dto';

@Injectable({
  providedIn: 'root'
})
export class DocumentTrackingService extends BaseService<DocumentTracking> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('DocumentTracking');
  }

  getDtoById(id: number): Observable<DocumentTrackingDto> {
    return this.httpClient.get<DocumentTrackingDto>(`${this.url}/${id}`);
  }

  getPaging(query: GetPagingDocumentTrackingQuery): Observable<PaginateRsult<DocumentTrackingDto>> {
    const params = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<DocumentTrackingDto>>(this.url, { params });
  }

  exportToExcel(filter: any): Observable<ExportModel> {
    const params = this.httpParams(filter);
    return this.httpClient.get<ExportModel>(`${this.url}/ExportToExcel`, { params });
  }

  exportToPdf(filter: any): Observable<ExportModel> {
    const params = this.httpParams(filter);
    return this.httpClient.get<ExportModel>(`${this.url}/ExportToPdf`, { params });
  }
}
