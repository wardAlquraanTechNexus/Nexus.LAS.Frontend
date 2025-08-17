import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { User } from '../../../../models/user/user';
import { Sort } from '@angular/material/sort';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { PaginateRsult } from '../../../../models/paginate-result';
import { BaseParam } from '../../../../models/base/base-param';
import { GetUserParam } from '../../../../models/user/get-user-dto/get-user-param';
import { UserService } from '../../../../services/user-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserDto } from '../../../../models/user/get-user-dto/user-dto';

@Component({
  selector: 'app-user-table',
  standalone:false,
  templateUrl: './user-table.html',
  styleUrl: './user-table.scss'
})
export class UserTable extends TableFormComponent<User> 
{
  override data: PaginateRsult<UserDto> = {
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
    },
    {
      key: "personsIdN",
      label: "Person Id",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "firstName",
      label: "First Name",
    },
    {
      key: "lastName",
      label: "Last Name",
    },
    {
      key: "loginName",
      label: "Login Name",
    }
    ,
    {
      key: "nTLogin",
      label: "NT Login",
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

    override fetchData() {
    this.showLoading = true;
    this.service.searchUser(this.params).subscribe({
      next: (res => {
        this.data = res;
        this.showLoading = false;
        this.cdr.markForCheck();
      }),
      error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();

      })
    })
  }

}
