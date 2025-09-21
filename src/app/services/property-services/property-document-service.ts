import { Injectable } from '@angular/core';
import { PropertyDocument } from '../../models/property-models/property-document/property-document';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';
import { map, Observable } from 'rxjs';
import { PropertyDocumentDTO } from '../../models/property-models/property-document/dtos/property-document-dto';
import { PersonIdDetailDto } from '../../models/person-models/person-id-details/person-id-details-dto';
import { GetPropertyDocumentQuery } from '../../models/property-models/property-document/params/get-property-document-query';
import { PaginateRsult } from '../../models/paginate-result';

@Injectable({
  providedIn: 'root'
})
export class PropertyDocumentService extends BaseService<PropertyDocument> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('PropertyDocument');
  }

  careateByForm(formData: FormData): Observable<number> {
    return this.httpClient.post<number>(this.url+"/createByForm", formData);

  }
  updateByForm(formData: FormData): Observable<number> {
    return this.httpClient.put<number>(this.url + "/updateByForm", formData);

  }
  updateByBody(propertyDocument:PropertyDocumentDTO): Observable<number> {
    return this.httpClient.put<number>(this.url ,propertyDocument );

  }

    getDTOById(id: number): Observable<PropertyDocumentDTO | null> {
      return this.getPaging({ id: id , page : 0 , pageSize: 1}).pipe(
        map(result => result.collection.length > 0 ? result.collection[0] : null)
      );
    }

    getPaging(query: GetPropertyDocumentQuery): Observable<PaginateRsult<PropertyDocumentDTO>> {
      return this.httpClient.get<PaginateRsult<PropertyDocumentDTO>>(`${this.url}`, { params: this.httpParams(query) });
    }
}
