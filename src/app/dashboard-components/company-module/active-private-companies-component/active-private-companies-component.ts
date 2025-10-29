import { Component } from '@angular/core';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';
import { EntityIDc } from '../../../enums/entity-idc';

@Component({
  selector: 'app-active-private-companies-component',
  standalone:false,
  templateUrl: './active-private-companies-component.html',
  styleUrls: ['./active-private-companies-component.scss']
})
export class ActivePrivateCompaniesComponent extends BaseTableViewComponent {

}