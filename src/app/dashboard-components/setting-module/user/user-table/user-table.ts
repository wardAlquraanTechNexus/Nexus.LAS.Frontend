import { ChangeDetectorRef, Component } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { User } from '../../../../models/user/user';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { PaginateRsult } from '../../../../models/paginate-result';
import { UserService } from '../../../../services/user-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from '../../../../services/language-service';
import { GetUserParam } from '../../../../models/user/param/get-user-param';
import { UserDto } from '../../../../models/user/dtos/user-dto';
import { UserDialogFormComponent } from './user-dialog-form-component/user-dialog-form-component';

@Component({
  selector: 'app-user-table',
  standalone:false,
  templateUrl: './user-table.html',
  // styleUrls: ['./../../../_shared/styles/table-style.scss']
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
        label: this.label.PERSON.PERSON,
        pipes: ['person']
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
      {
        key: "action",
        label: this.label.COMMON.ACTIONS,
      }
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

  onEdit(row: any) {
      const element = {
        username: row.username,
        personId: row.personsIdN
      };
      const dialogRef = this.dialog.open(UserDialogFormComponent, {
        disableClose: true,
        data: element,
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.fetchData();
        }
      })
  
    }
}
