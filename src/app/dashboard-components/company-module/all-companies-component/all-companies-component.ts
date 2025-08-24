import { Component } from '@angular/core';
import { CompanyTableView } from '../_base/company-table-view/company-table-view';

@Component({
  selector: 'app-all-companies-component',
  standalone: false,
  templateUrl: './all-companies-component.html',
  styleUrls: ['./all-companies-component.scss']
})
export class AllCompaniesComponent extends CompanyTableView {

}