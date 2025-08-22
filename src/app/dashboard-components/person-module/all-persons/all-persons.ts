import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonTableView } from '../_base/person-table-view/person-table-view';

@Component({
  selector: 'app-all-persons',
  standalone: false,
  templateUrl: './all-persons.html',
  styleUrls: ['./all-persons.scss', '../_base/base-persons-component/base-persons-component.scss']
})
export class AllPersons extends PersonTableView{
  

}
