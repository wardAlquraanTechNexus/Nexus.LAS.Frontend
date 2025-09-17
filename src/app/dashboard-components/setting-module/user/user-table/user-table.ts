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
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDto } from '../../../../models/user/get-user-dto/user-dto';
import { LanguageService } from '../../../../services/language-service';

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

  override displayColumns: DisplayColumn[] = []

   override ngOnInit(): void {
    super.ngOnInit();
  }

  override setDisplayColumns(): void {
    this.displayColumns = [
      {
        key: "username",
        label: this.label.COMMON.USERNAME,
      },
      {
        key: "personsIdN",
        label: this.label.COMMON.ID,
      },
      {
        key: "email",
        label: this.label.COMMON.EMAIL,
      },
      {
        key: "firstName",
        label: this.label.COMMON.FIRST_NAME,
      },
      {
        key: "lastName",
        label: this.label.COMMON.LAST_NAME,
      },
      {
        key: "loginName",
        label: this.label.COMMON.LOGIN_NAME,
      },
      {
        key: "nTLogin",
        label: this.label.COMMON.NT_LOGGIN,
      },
    ];
  }

   constructor(
    override service: UserService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    protected dialog: MatDialog,
    override langService: LanguageService,
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
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
