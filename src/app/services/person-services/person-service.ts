import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { Person } from '../../models/person-models/person';
import { HttpClient } from '@angular/common/http';
import { CreatePersonCommand } from '../../models/person-models/create-person';
import { Observable, shareReplay } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';
import { GetAllActivePersonQuery } from '../../models/person-models/get-all-active-person-query';
import { BulkChangeStatusCommand } from '../../models/person-models/bulk-change-status-command';
import { BulkChangePrivateCommand } from '../../models/person-models/bulk-change-private-command';
import { UploadPersonImageCommand } from '../../models/person-models/upload-person-image/upload-person-image-command';
import { UploadImageDto } from '../../models/base/upload-image-dto';
import { PersonDto } from '../../models/person-models/person-dto';
import { GetPersonsDTO } from '../../models/person-models/get-persons/get-person-dto';
import { GetPersonsQuery } from '../../models/person-models/get-persons/get-persons-query';
import { UpdatePersonCommand } from '../../models/person-models/update-person';
import { ExportModel } from '../../models/export-to-excel-dto';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends BaseService<Person> {

  private personsRequest$?: Observable<GetPersonsDTO[]>;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('Persons');
  }

  getPersonDto(id: number): Observable<PersonDto> {
    return this.httpClient.get<PersonDto>(this.url + "/" + id);

  }

  createPerson(command: CreatePersonCommand): Observable<number> {
    return this.httpClient.post<number>(this.url , command);
  }
  updatePerson(command: UpdatePersonCommand): Observable<GetPersonsDTO> {
    return this.httpClient.put<GetPersonsDTO>(this.url , command);
  }

  getPersons(getAllPersonQuery: GetPersonsQuery): Observable<PaginateRsult<GetPersonsDTO>> {
    var params = this.httpParams(getAllPersonQuery);
    return this.httpClient.get<PaginateRsult<GetPersonsDTO>>(this.url + "/GetPersons", { params });
  }
  getAllPersons(getAllPersonQuery: GetPersonsQuery): Observable<GetPersonsDTO[]> {
    if (!this.personsRequest$) {
      const params = this.httpParams(getAllPersonQuery);
      this.personsRequest$ = this.httpClient.get<GetPersonsDTO[]>(this.url + "/GetAllPersons", { params })
        .pipe(
          shareReplay(1) // cache the latest value
        );
    }
    return this.personsRequest$;
  }
  getAllActivePerson(getAllPersonQuery: GetAllActivePersonQuery): Observable<PaginateRsult<GetPersonsDTO>> {
    var params = this.httpParams(getAllPersonQuery);
    return this.httpClient.get<PaginateRsult<GetPersonsDTO>>(this.url + "/GetAllActivePerson", { params });
  }

  bulkChangeStatus(command: BulkChangeStatusCommand): Observable<number> {
    return this.httpClient.put<number>(this.url + "/BulkChangeStatus", command);
  }

  bulkChangePrivate(command: BulkChangePrivateCommand): Observable<number> {
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

  uploadImage(command: UploadPersonImageCommand): Observable<UploadImageDto> {
    let formData: FormData = new FormData();
    formData.append("personId", command.personId.toString());
    formData.append("file", command.file);

    return this.httpClient.post<UploadImageDto>(this.url + "/UploadImage", formData);

  }
}
