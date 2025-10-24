import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalSearchDTO } from '../../models/global-models/global-search/global-search-dto';
import { GlobalSearchQuery } from '../../models/global-models/global-search/global-search-param';
import { GlobalInfoDTO } from '../../models/global-models/global-info/global-info-dto';
import { GlobalDocumentExpiredDto } from '../../models/global-models/global-document-expired/global-document-expired';
import { PaginateRsult } from '../../models/paginate-result';
import { BaseParam } from '../../models/base/base-param';
import { GlobalExpiredDocumentQuery } from '../../models/global-models/global-document-expired/global-document-expired-param';
import { ExportModel } from '../../models/export-to-excel-dto';
import { DeactivateGlobalReminderParam } from '../../models/global-models/global-document-expired/deactivate-global-reminder-param';

@Injectable({
  providedIn: 'root'
})
export class GlobalService extends BaseService<GlobalDocumentExpiredDto>{
    
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('Global');
  }

  globalSearch(query: GlobalSearchQuery): Observable<GlobalSearchDTO[]> {
    let params =this.httpParams(query);
    return this.httpClient.get<GlobalSearchDTO[]>(`${this.url}/globalSearch`, { params });
  }

  globalInfo(): Observable<GlobalInfoDTO[]> {
    return this.httpClient.get<GlobalInfoDTO[]>(`${this.url}/globalInfo`);
  }

   globalExpiredDocuments(query:GlobalExpiredDocumentQuery): Observable<PaginateRsult<GlobalDocumentExpiredDto>> {
    let param = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<GlobalDocumentExpiredDto>>(`${this.url}/GlobalDocumentExpired` , {params : param});
  }

  deactiveReminder(params: DeactivateGlobalReminderParam): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.url}/DeactiveReminder`, params);
  }

    exportToExcel(): Observable<ExportModel> {
      return this.httpClient.get<ExportModel>(this.url + "/ExportToExcel");
    }

}