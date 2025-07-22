import { Injectable } from '@angular/core';
import { Country } from '../models/country/country';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base/base-service';

@Injectable({
  providedIn: 'root'
})
export class CountryService  extends BaseService<Country>{
    
  constructor(httpClient: HttpClient){
    super(httpClient);
    this.setPath('Countries');
  }

}