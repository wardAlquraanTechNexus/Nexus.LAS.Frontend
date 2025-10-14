import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentTrackingAction } from '../../models/document-tracking-models/document-tracking-action/document-tracking-action';
import { DocumentTrackingActionDto } from '../../models/document-tracking-models/document-tracking-action/dto/document-tracking-action-dto';
import { GetPagingDocumentTrackingActionQuery } from '../../models/document-tracking-models/document-tracking-action/params/get-paging-document-tracking-action-param';
import { BaseService } from '../base/base-service';
import { PaginateRsult } from '../../models/paginate-result';

@Injectable({
  providedIn: 'root'
})
export class DocumentTrackingActionService extends BaseService<DocumentTrackingAction> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('DocumentTrackingsAction');
  }

  getDtoById(id: number): Observable<DocumentTrackingActionDto> {
    return this.httpClient.get<DocumentTrackingActionDto>(`${this.url}/${id}`);
  }

  getPaging(query: GetPagingDocumentTrackingActionQuery): Observable<PaginateRsult<DocumentTrackingActionDto>> {
    const params = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<DocumentTrackingActionDto>>(this.url, { params });
  }
}