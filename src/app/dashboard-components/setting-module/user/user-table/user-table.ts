import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { User } from '../../../../models/user/user';
import { Sort } from '@angular/material/sort';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { PaginateRsult } from '../../../../models/paginate-result';
import { BaseParam } from '../../../../models/base/base-param';
import { GetUserParam } from '../../../../models/user/param/get-user-param';
import { UserService } from '../../../../services/user-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-table',
  standalone:false,
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss'
})
export class UserTable extends TableFormComponent<User> 
{
  override data: PaginateRsult<User> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: GetUserParam = {
    username: null,
    personsIdN: null,
    page: 0,
    pageSize: 10
  };


   override displayColumns: DisplayColumn[] = [
    
    {
      key: "username",
      label: "Username",
      sort: true
    },
    {
      key: "personsIdN",
      label: "Person Id",
      sort: true
    },
    {
      key: "loginName",
      label: "Login Name",
      sort: true
    }
    ,
    {
      key: "nTLogin",
      label: "NT Login",
      sort: true
    },
    {
      key: "action",
      label: "Action",
    },
    
  ]

   constructor(
    override service: UserService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override snackBar: MatSnackBar,
    override route: ActivatedRoute,
    protected dialog: MatDialog,
  ) {
    super(service, cdr, fb, router, snackBar, route);
  }


}
