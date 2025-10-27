import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginateRsult } from '../../../../../models/paginate-result';
import { UserGroup } from '../../../../../models/user-group/user-group';
import { GetUserGroupDTOQuery } from '../../../../../models/user-group/user-group-dto/get-user-group-query';
import { UserGroupDto } from '../../../../../models/user-group/user-group-dto/user-group-dto';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { UserGroupService } from '../../../../../services/user-group-service';
import { TableFormComponent } from '../../../../base-components/table-form-component/table-form-component';

@Component({
  selector: 'app-users-by-group',
  standalone: false,
  templateUrl: './users-by-group-component.html',
  styleUrls: ['./users-by-group-component.scss']
})
export class UsersByGroupComponent extends TableFormComponent<UserGroup> {

  @Input() groupId!: number;

  override data: PaginateRsult<UserGroupDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: GetUserGroupDTOQuery = {
    userId: null,
    page: 0,
    pageSize: 10
  };

  constructor(
    override service: UserGroupService,
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
    this.params.groupId = this.groupId;
    this.showLoading = true;
    this.service.getAllUsersByGroup(this.params).subscribe({
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

  override setDisplayColumns(): void {
    this.displayColumns = [
      {
        key: "username",
        label: this.label.SETTINGS.USERNAME,
      },
      {
        key: "userFullName",
        label: this.label.SETTINGS.USER_FULL_NAME,
      },
      {
        key: "isUserInGroup",
        label: this.label.SETTINGS.IS_USER_IN_GROUP,
        inputType: 'mat-slide-toggle'
      }
    ];
  }

  onRowClick(row: any) {
    if (row.key == 'isUserInGroup') {
      // Prevent row click action
      if (row.element.isUserInGroup) {
        this.showLoading = true;
        if (row.element.id) {
          this.service.update({
            userId: row.element.userId,
            groupId:  this.groupId,
            id: row.element.id,
          }).subscribe({
            next: (res => {
              this.fetchData();
            })
          })

        } else {
          this.service.create({
            userId: row.element.userId,
            groupId: this.groupId,
          }).subscribe({
            next: (res => {
              this.fetchData();
            })
          })
        }
      } else {
        this.showLoading = true;
        if (row.element.id) {
          this.service.delete(row.element.id).subscribe({
            next: (res => {
              this.fetchData();
            })
          });

        }
      }

    }
  }

}
