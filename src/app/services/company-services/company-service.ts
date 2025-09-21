import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { Company } from '../../models/company-models/company';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetCompanyDto } from '../../models/company-models/get-company-query/get-company-dto';
import { Observable, shareReplay } from 'rxjs';
import GetCompanyQuery from '../../models/company-models/get-company-query/get-company-dto-command';
import { PaginateRsult } from '../../models/paginate-result';
import { ExportModel } from '../../models/export-to-excel-dto';
import { BulkChangePrivateCommand } from '../../models/person-models/bulk-change-private-command';
import { BulkChangeStatusCommand } from '../../models/person-models/bulk-change-status-command';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService<Company> {

  private companiesRequest$?: Observable<Company[]>;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('Company');
  }

  getCompanies(query: GetCompanyQuery): Observable<PaginateRsult<GetCompanyDto>> {
    let params = new HttpParams();

    Object.entries(query).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          params = params.set(key, value.join(','));
        } else {
          params = params.set(key, value.toString());
        }
      }
    });
    return this.httpClient.get<PaginateRsult<GetCompanyDto>>(`${this.url}/GetCompanies`, { params });

  }
  exportToExcel(filter: any): Observable<ExportModel> {
    var params = this.httpParams(filter);
    return this.httpClient.get<ExportModel>(this.url + "/ExportToExcel", { params });
  }
  exportToPdf(filter: any): Observable<ExportModel> {
    var params = this.httpParams(filter);
    return this.httpClient.get<ExportModel>(this.url + "/ExportToPdf", { params });
  }


  getCompanyById(id: number): Observable<GetCompanyDto> {
    return this.httpClient.get<GetCompanyDto>(`${this.url}/${id}`);

  }

  createCompany(item: Company): Observable<number> {
    return this.httpClient.post<number>(this.url + "/CreateCompany", item);
  }

  updateCompany(item: Company): Observable<boolean> {
    return this.httpClient.put<boolean>(this.url + "/UpdateCompany", item);
  }

  updateStatus(command: BulkChangeStatusCommand) {
    return this.httpClient.put<number>(this.url + "/BulkChangeStatus", command);
  }

  updatePrivate(command: BulkChangePrivateCommand) {
    return this.httpClient.put<number>(this.url + "/BulkChangePrivate", command);
  }

  getAllCompanies(getAllCompanyQuery: GetCompanyQuery): Observable<Company[]> {
    if (!this.companiesRequest$) {
      const params = this.httpParams(getAllCompanyQuery);
      this.companiesRequest$ = super.getAllByParams(params)
        .pipe(
          shareReplay(1) 
        );
    }
    return this.companiesRequest$;
  }
}
