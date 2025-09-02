import { Component } from '@angular/core';
import { CompanyTableView } from '../_base/company-table-view/company-table-view';

@Component({
  selector: 'app-active-companies-component',
  standalone:false,
  templateUrl: './active-companies-component.html',
  styleUrls: ['./active-companies-component.scss']
})
export class ActiveCompaniesComponent  extends CompanyTableView {

}