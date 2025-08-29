import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { CompanyCapital } from '../../models/company-models/company-capital/company-capital';
import { HttpClient } from '@angular/common/http';
import { GetPagingCompanyCapital } from '../../models/company-models/company-capital/params/get-paging-company-capital';
import { CompanyCapitalDto } from '../../models/company-models/company-capital/dtos/company-capital-dto';
import { Observable, Subject, tap } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';

@Injectable({
  providedIn: 'root'
})
export class CompanyCapitalService extends BaseService<CompanyCapital> {
  private activeCapitalUpdatedSource = new Subject<CompanyCapital>();
  activeCapitalUpdated$ = this.activeCapitalUpdatedSource.asObservable();

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyCapital');
  }

  getPaging(params: GetPagingCompanyCapital): Observable<PaginateRsult<CompanyCapitalDto>> {
    return this.httpClient.get<PaginateRsult<CompanyCapitalDto>>(this.url, { params: this.httpParams(params) });
  }

  override update(item: CompanyCapital): Observable<number> {
    return this.httpClient.put<number>(this.url, item).pipe(
      tap({
        next: () => {
          this.activeCapitalUpdatedSource.next(item); // only on success
        },
        error: () => {
          // do nothing on error, just let it propagate
        }
      })
    );
  }
}
