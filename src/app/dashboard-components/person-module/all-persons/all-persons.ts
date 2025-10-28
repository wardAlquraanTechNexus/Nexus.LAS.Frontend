import { Component } from '@angular/core';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-all-persons',
  standalone: false,
  templateUrl: './all-persons.html',
  styleUrls: ['./all-persons.scss', '../_base/base-persons-component/base-persons-component.scss']
})
export class AllPersons extends BaseTableViewComponent{
  

}
