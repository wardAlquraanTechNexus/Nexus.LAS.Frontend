import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { UserGroup } from '../../../../models/user-group/user-group';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { UserGroupDto } from '../../../../models/user-group/user-group-dto/user-group-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { GetUserGroupDTOQuery } from '../../../../models/user-group/user-group-dto/get-user-group-query';
import { UserGroupService } from '../../../../services/user-group-service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-groups-by-user',
  standalone: false,
  templateUrl: './groups-by-user-component.html',
  styleUrls: ['./groups-by-user-component.scss']
})
export class GroupsByUserComponent extends TableFormComponent<UserGroup> {

  @Input() userId!: number;

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
    this.params.userId = this.userId;
    this.showLoading = true;
    this.service.getAllGroupsByUser(this.params).subscribe({
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
        key: "groupName",
        label: this.label.SETTINGS.THE_GROUP,
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
            userId: this.userId || row.element.userId,
            groupId: row.element.groupId,
            id: row.element.id,
          }).subscribe({
            next: (res => {
              this.fetchData();
            })
          })

        } else {
          this.service.create({
            userId: this.userId || row.element.userId,
            groupId: row.element.groupId,
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
