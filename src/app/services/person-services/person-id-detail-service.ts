import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PersonsIDDetail } from '../../models/person-models/person-id-details/person-id-details';
import { PersonIdDetailDto } from '../../models/person-models/person-id-details/person-id-details-dto';

@Injectable({
  providedIn: 'root'
})
export class PersonIdDetailService extends BaseService<PersonsIDDetail> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('PersonIdDetails');
  }

  careateByForm(formData: FormData): Observable<number> {
    return this.httpClient.post<number>(this.url, formData);

  }
  updateByDto(formData: FormData): Observable<number> {
    return this.httpClient.put<number>(this.url, formData);

  }
  updateByBody(personIdDetail:PersonsIDDetail): Observable<number> {
    return this.httpClient.put<number>(this.url + "/UpdateByBody",personIdDetail );

  }

  getDTOById(id: number): Observable<PersonIdDetailDto> {
    return this.httpClient.get<PersonIdDetailDto>(`${this.url}/GetDTOById/${id}`);
  }
}
