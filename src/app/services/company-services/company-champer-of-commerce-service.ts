import { Injectable } from '@angular/core';
import { CompanyChamberOfCommerce } from '../../models/company-models/company-champer-of-commerce/company-champer-of-commerce';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../base/base-service';

@Injectable({
  providedIn: 'root'
})
export class CompanyChamperOfCommerceService  extends BaseService<CompanyChamberOfCommerce> {
  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.setPath('CompanyChamberOfCommerce');
  }


}

