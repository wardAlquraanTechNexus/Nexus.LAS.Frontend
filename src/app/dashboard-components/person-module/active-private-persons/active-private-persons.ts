import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonStatus } from '../../../enums/person-status';
import { DisplayColumn } from '../../../models/columns/display-column';
import { GetPersonsQuery } from '../../../models/persons/get-persons/get-persons-query';
import { MenuService } from '../../../services/menu-service';
import { PersonService } from '../../../services/person-services/person-service';
import { BasePersonsComponent } from '../_base/base-persons-component/base-persons-component';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../services/dynamic-list-service';

@Component({
  selector: 'app-not-active-persons',
  standalone:false,
  templateUrl: './active-private-persons.html',
  styleUrls: ['./active-private-persons.scss', '../_base/base-persons-component/base-persons-component.scss']
})
export class ActivePrivatePersons extends BasePersonsComponent {

  override params: GetPersonsQuery = {
      searchBy: null,
      nationality: null,
      private: true,
      status: PersonStatus.Active,
      page: 0,
      pageSize: 10
    }
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
      key: "fpcCode",
      label: "FPC Code"
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