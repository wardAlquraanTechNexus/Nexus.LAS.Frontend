import { Component } from '@angular/core';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-active-companies-component',
  standalone:false,
  templateUrl: './active-companies-component.html',
  styleUrls: ['./active-companies-component.scss']
})
export class ActiveCompaniesComponent  extends BaseTableViewComponent {

}