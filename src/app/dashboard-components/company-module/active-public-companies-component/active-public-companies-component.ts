import { Component } from '@angular/core';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';
import { EntityIDc } from '../../../enums/entity-idc';

@Component({
  selector: 'app-active-public-companies-component',
  standalone:false,
  templateUrl: './active-public-companies-component.html',
  styleUrls: ['./active-public-companies-component.scss']
})
export class ActivePublicCompaniesComponent extends BaseTableViewComponent {

}