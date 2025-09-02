import { Component } from '@angular/core';
import { CompanyTableView } from '../_base/company-table-view/company-table-view';

@Component({
  selector: 'app-active-public-companies-component',
  standalone:false,
  templateUrl: './active-public-companies-component.html',
  styleUrl: './active-public-companies-component.scss'
})
export class ActivePublicCompaniesComponent extends CompanyTableView {

}