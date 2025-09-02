import { Component } from '@angular/core';
import { CompanyTableView } from '../_base/company-table-view/company-table-view';

@Component({
  selector: 'app-active-private-companies-component',
  standalone:false,
  templateUrl: './active-private-companies-component.html',
  styleUrl: './active-private-companies-component.scss'
})
export class ActivePrivateCompaniesComponent extends CompanyTableView {

}