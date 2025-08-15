import { Injectable } from '@angular/core';
import { BaseService } from '../base/base-service';
import { Person } from '../../models/persons/person';
import { HttpClient } from '@angular/common/http';
import { CreatePersonCommand } from '../../models/persons/create-person';
import { Observable } from 'rxjs';
import { PaginateRsult } from '../../models/paginate-result';
import { GetAllActivePersonQuery } from '../../models/persons/get-all-active-person-query';
import { UpdatePersonCommand } from '../../models/persons/update-person';
import { BulkChangeStatusCommand } from '../../models/persons/bulk-change-status-command';
import { BulkChangePrivateCommand } from '../../models/persons/bulk-change-private-command';
import { ExportPersonToExcel } from '../../models/persons/export-person-to-excel-dto';
import { ExportPersonToPdf } from '../../models/persons/export-person-to-pdf-dto';
import { UploadPersonImageCommand } from '../../models/persons/upload-person-image/upload-person-image-command';
import { UploadImageDto } from '../../models/base/upload-image-dto';
import { PersonDto } from '../../models/persons/person-dto';
import { GetPersonsDTO } from '../../models/persons/get-persons/get-person-dto';
import { GetPersonsQuery } from '../../models/persons/get-persons/get-persons-query';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends BaseService<Person> {
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('Persons');
  }

  getPersonDto(id:number):Observable<PersonDto>{
    return this.httpClient.get<PersonDto>(this.url + "/" + id);

  }

  createPerson(command:CreatePersonCommand):Observable<number>{
    return this.httpClient.post<number>(this.url + "/CreatePerson", command);
  }
  updatePerson(command:UpdatePersonCommand):Observable<GetPersonsDTO>{
    return this.httpClient.put<GetPersonsDTO>(this.url + "/UpdatePerson", command);
  }

  getPersons(getAllPersonQuery:GetPersonsQuery):Observable<PaginateRsult<GetPersonsDTO>>{
    var params = this.httpParams(getAllPersonQuery);
    return this.httpClient.get<PaginateRsult<GetPersonsDTO>>(this.url + "/GetPersons", {params});
  }
  getAllActivePerson(getAllPersonQuery:GetAllActivePersonQuery):Observable<PaginateRsult<GetPersonsDTO>>{
    var params = this.httpParams(getAllPersonQuery);
    return this.httpClient.get<PaginateRsult<GetPersonsDTO>>(this.url + "/GetAllActivePerson", {params});
  }

  bulkChangeStatus(command:BulkChangeStatusCommand):Observable<number>
  {
    return this.httpClient.put<number>(this.url + "/BulkChangeStatus", command);
  }

  bulkChangePrivate(command:BulkChangePrivateCommand):Observable<number>
  {
    return this.httpClient.put<number>(this.url + "/BulkChangePrivate", command);
  }

  exportPersonToExcel(filter:any):Observable<ExportPersonToExcel>{
    var params = this.httpParams(filter);
    return this.httpClient.get<ExportPersonToExcel>(this.url + "/ExportToExcel", {params});
  }
  exportPersonToPdf(filter:any):Observable<ExportPersonToPdf>{
    var params = this.httpParams(filter);
    return this.httpClient.get<ExportPersonToPdf>(this.url + "/ExportToPdf", {params});
  }

  uploadImage(command: UploadPersonImageCommand): Observable<UploadImageDto> {
      let formData: FormData = new FormData();
      formData.append("personId", command.personId.toString());
      formData.append("file", command.file);
  
      return this.httpClient.post<UploadImageDto>(this.url + "/UploadImage", formData);
  
    }
}
