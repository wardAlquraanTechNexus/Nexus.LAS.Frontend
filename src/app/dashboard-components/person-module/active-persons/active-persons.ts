import { ChangeDetectorRef, Component } from '@angular/core';

import { PersonTableView } from '../_base/person-table-view/person-table-view';

@Component({
  selector: 'app-active-persons',
  standalone:false,
  templateUrl: './active-persons.html',
  styleUrls: ['./active-persons.scss','../_base/base-persons-component/base-persons-component.scss']
})
export class ActivePersons extends PersonTableView{ 
}
