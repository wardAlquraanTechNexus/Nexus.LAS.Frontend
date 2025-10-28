import { Component } from '@angular/core';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-not-active-persons',
  standalone:false,
  templateUrl: './active-private-persons.html',
  styleUrls: ['./active-private-persons.scss', '../_base/base-persons-component/base-persons-component.scss']
})
export class ActivePrivatePersons extends BaseTableViewComponent {}