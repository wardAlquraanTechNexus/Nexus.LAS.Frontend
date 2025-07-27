import { Injectable } from '@angular/core';
import { BaseService } from './base/base-service';
import { PersonOtherDocument } from '../models/person-other-document/person-other-document';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonOtherDocumentService extends BaseService<PersonOtherDocument>
{
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('PersonOtherDocuments');
  }
   careateByForm(formData: FormData): Observable<number> {
      return this.httpClient.post<number>(this.url , formData);
  
    }
}
