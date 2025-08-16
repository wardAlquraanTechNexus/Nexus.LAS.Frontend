import { ChangeDetectorRef, Component } from '@angular/core';
import { PersonService } from '../../../services/person-services/person-service';
import { DisplayColumn } from '../../../models/columns/display-column';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasePersonsComponent } from '../_base/base-persons-component/base-persons-component';
import { MenuService } from '../../../services/menu-service';
import { GetPersonsQuery } from '../../../models/persons/get-persons/get-persons-query';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { DynamicList } from '../../../models/dynamic-list/dynamic-list';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-all-persons',
  standalone: false,
  templateUrl: './all-persons.html',
  styleUrls: ['./all-persons.scss', '../_base/base-persons-component/base-persons-component.scss']
})
export class AllPersons extends BasePersonsComponent {

  override displayColumns: DisplayColumn[] = [
    {
      key: "select",
      label: "",
    },
    {
      key: "personCode",
      label: "Code",
      sort: true,
      pipes: ["link"]
    },
    {
      key: "personEnglishName",
      label: "Name En",
      pipes: ["link"],
      sort: true
    },
    {
      key: "personArabicName",
      label: "Name Ar",
      pipes: ["link"],
      sort: true
    },
    {
      key: "personShortName",
      label: "Short Name",
      sort: true
    },
    {
      key: "personStatus",
      label: "Status",
      pipes: ["personStatus"],
      sort: true
    },
    {
      key: "fpcCode",
      label: "FPC Code"
    },
    {
      key: "private",
      label: "Private",
      pipes: ['privatePerson'],
      sort: true,
    },
    {
      key: "action",
      label: "Action",
    },
  ]

 

  constructor(
    override service: PersonService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override snackBar: MatSnackBar,
    override route: ActivatedRoute,
    override menuService: MenuService,
    override dialog: MatDialog,
    override dlService: DynamicListService
  ) {
    super(service, cdr, fb, router, snackBar, route, menuService, dialog, dlService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    
  }


 


}
