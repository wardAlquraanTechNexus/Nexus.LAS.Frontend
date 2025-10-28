import { Component } from '@angular/core';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-active-public-persons',
  standalone: false,
  templateUrl: './active-public-persons.html',
  styleUrls: ['./active-public-persons.scss', '../_base/base-persons-component/base-persons-component.scss']
})
export class ActivePublicPersons extends BaseTableViewComponent{
  
}