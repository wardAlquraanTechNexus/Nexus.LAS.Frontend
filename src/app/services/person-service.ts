import { Injectable } from '@angular/core';
import { BaseService } from './base/base-service';
import { Person } from '../models/persons/person';
import { HttpClient } from '@angular/common/http';
import { CreatePersonCommand } from '../models/persons/create-person';
import { Observable } from 'rxjs';
import { GetAllPersonQuery } from '../models/persons/get-all-person-query';
import { PaginateRsult } from '../models/paginate-result';
import { GetAllPersonDTO } from '../models/persons/get-all-person-dto';
import { GetAllActivePersonQuery } from '../models/persons/get-all-active-person-query';
import { UpdatePersonCommand } from '../models/persons/update-person';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends BaseService<Person> {
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('Persons');
  }


  createPerson(command:CreatePersonCommand):Observable<number>{
    return this.httpClient.post<number>(this.url + "/CreatePerson", command);
  }
  updatePerson(command:UpdatePersonCommand):Observable<GetAllPersonDTO>{
    return this.httpClient.put<GetAllPersonDTO>(this.url + "/UpdatePerson", command);
  }

  getAllPerson(getAllPersonQuery:GetAllPersonQuery):Observable<PaginateRsult<GetAllPersonDTO>>{
    var params = this.httpParams(getAllPersonQuery);
    return this.httpClient.get<PaginateRsult<GetAllPersonDTO>>(this.url + "/GetAllPerson", {params});
  }
  getAllActivePerson(getAllPersonQuery:GetAllActivePersonQuery):Observable<PaginateRsult<GetAllPersonDTO>>{
    var params = this.httpParams(getAllPersonQuery);
    return this.httpClient.get<PaginateRsult<GetAllPersonDTO>>(this.url + "/GetAllActivePerson", {params});
  }
}
