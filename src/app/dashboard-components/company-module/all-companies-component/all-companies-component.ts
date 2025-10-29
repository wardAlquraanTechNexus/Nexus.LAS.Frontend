import { Component } from '@angular/core';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';
import { EntityIDc } from '../../../enums/entity-idc';

@Component({
  selector: 'app-all-companies-component',
  standalone: false,
  templateUrl: './all-companies-component.html',
  styleUrls: ['./all-companies-component.scss']
})
export class AllCompaniesComponent extends BaseTableViewComponent {


}