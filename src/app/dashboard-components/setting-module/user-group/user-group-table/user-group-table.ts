import { ChangeDetectorRef, Component } from '@angular/core';
import { UserGroup } from '../../../../models/user-group/user-group';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { PaginateRsult } from '../../../../models/paginate-result';
import { GetUserGroupDTOQuery } from '../../../../models/user-group/user-group-dto/get-user-group-query';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { UserGroupService } from '../../../../services/user-group-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserGroupFormDialog } from '../user-group-form-dialog/user-group-form-dialog';

@Component({
  selector: 'app-user-group-table',
  standalone: false,
  templateUrl: './user-group-table.html',
  styleUrl: './user-group-table.scss'
})
export class UserGroupTable extends TableFormComponent<UserGroup> {

  override data: PaginateRsult<UserGroup> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: GetUserGroupDTOQuery = {
    username: null,
    groupName: null,
    groupId: null,
    userId: null,
    page: 0,
    pageSize: 10
  };


  override displayColumns: DisplayColumn[] = [
    {
      key: "username",
      label: "Username",
    },
    {
      key: "groupName",
      label: "Group Name",
    },
    {
      key: "action",
      label: "Action",
    },
  ]

  constructor(
    override service: UserGroupService,
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
    this.service.getUserGroupDTOs(this.params).subscribe({
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

  onAddNew() {
    let userGroup: UserGroup = {
      id: 0,
      userId: 0,
      groupId: 0
    };
    const dialogRef = this.dialog.open(UserGroupFormDialog, {
      disableClose: true,
      data: userGroup
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  onEdit(userGroup: UserGroup) {

    const dialogRef = this.dialog.open(UserGroupFormDialog, {
      disableClose: true,
      data: userGroup
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  getRemoveCallback(id: number): () => void {
    return () => this.delete(id);
  }

  delete(id: number) {
    this.showLoading = true;
    this.service.delete(id).subscribe({
      next: res => {
        this.fetchData();
      },
      error: (err => {
        this.showLoading = false;
      })
    })
  }


}
