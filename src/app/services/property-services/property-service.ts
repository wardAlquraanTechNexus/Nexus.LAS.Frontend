import { Injectable } from '@angular/core';
import { Property } from '../../models/property-models/property/property';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { BulkChangePrivateCommand } from '../../models/person-models/bulk-change-private-command';
import { BulkChangeStatusCommand } from '../../models/person-models/bulk-change-status-command';
import { PropertyDTO } from '../../models/property-models/property/dtos/propery-dto';
import { GetPropertyQuery } from '../../models/property-models/property/params/get-property-query';
import { Observable, shareReplay } from 'rxjs';
import { GetAllPropertiesQuery } from '../../models/property-models/property/params/get-all-properties-query';
import { ExportModel } from '../../models/export-to-excel-dto';
import { GetSharedPropertyParams } from '../../models/property-models/property/params/get-shared-property';
import { SharedPropertyDTO } from '../../models/property-models/property/dtos/shared-property-dto';
import { PaginateRsult } from '../../models/paginate-result';

@Injectable({
  providedIn: 'root'
})
export class PropertyService extends BaseService<Property> {

  private propertiesRequest$?: Observable<PropertyDTO[]>;


  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('Property');
  }

  updateStatus(command: BulkChangeStatusCommand) {
    return this.httpClient.put<number>(this.url + "/BulkChangeStatus", command);
  }

  updatePrivate(command: BulkChangePrivateCommand) {
    return this.httpClient.put<number>(this.url + "/BulkChangePrivate", command);
  }

  getDtoById(id: number) {
    return this.httpClient.get<PropertyDTO>(`${this.url}/${id}`);
  }

  getShared(query:GetSharedPropertyParams): Observable<PaginateRsult<SharedPropertyDTO>> {
    const params = this.httpParams(query);
    return this.httpClient.get<PaginateRsult<SharedPropertyDTO>>(this.url + "/GetSharedProperties", { params });
  }

  getAllProperties(propertyQuery: GetAllPropertiesQuery): Observable<PropertyDTO[]> {
    if (!this.propertiesRequest$) {
      const params = this.httpParams(propertyQuery);
      this.propertiesRequest$ = this.httpClient.get<PropertyDTO[]>(this.url + "/GetAllByQuery", { params })
        .pipe(
          shareReplay(1)
        );
    }
    return this.propertiesRequest$;
  }

  exportToExcel(filter: any): Observable<ExportModel> {
    var params = this.httpParams(filter);
    return this.httpClient.get<ExportModel>(this.url + "/ExportToExcel", { params });
  }

}
