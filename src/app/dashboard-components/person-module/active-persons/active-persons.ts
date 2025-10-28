import { Component } from '@angular/core';

import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-active-persons',
  standalone:false,
  templateUrl: './active-persons.html',
  styleUrls: ['./active-persons.scss','../_base/base-persons-component/base-persons-component.scss']
})
export class ActivePersons extends BaseTableViewComponent{ 
}
