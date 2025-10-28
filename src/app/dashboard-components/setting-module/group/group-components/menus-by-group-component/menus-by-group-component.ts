import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GroupMenu } from '../../../../../models/group-menu/group-menu';
import { PaginateRsult } from '../../../../../models/paginate-result';
import { UserGroupDto } from '../../../../../models/user-group/user-group-dto/user-group-dto';
import { TableFormComponent } from '../../../../base-components/table-form-component/table-form-component';
import { GroupMenuDTO } from '../../../../../models/group-menu/dtos/group-menu-dto';
import { GetAllMenusByGroupQuery } from '../../../../../models/group-menu/params/get-all-menus-by-group-query';
import { GroupMenuService } from '../../../../../services/group-menu-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from '../../../../../services/language-service';
import { GroupMenuDialogFormComponent } from './group-menu-dialog-form-component/group-menu-dialog-form-component';

@Component({
  selector: 'app-menus-by-group',
  standalone: false,
  templateUrl: './menus-by-group-component.html',
  styleUrl: './menus-by-group-component.scss'
})
export class MenusByGroupComponent extends TableFormComponent<GroupMenu> {

  @Input() groupId!: number;

  override data: PaginateRsult<GroupMenuDTO> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: GetAllMenusByGroupQuery = {
    groupId: this.groupId,
    page: 0,
    pageSize: 10
  };

  constructor(
    override service: GroupMenuService,
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
    this.service.getAllMenusByGroup(this.params).subscribe({
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
        key: "menuName",
        label: this.label.SETTINGS.MENU,
        sort: true
      },
      {
        key: "canInsert",
        label: this.label.SETTINGS.CAN_INSERT,
        pipes: ['yes-no']
      }, {
        key: "canUpdate",
        label: this.label.SETTINGS.CAN_UPDATE,
        pipes: ['yes-no']
      }, {
        key: "canDelete",
        label: this.label.SETTINGS.CAN_DELETE,
        pipes: ['yes-no']
      }, {
        key: "admin",
        label: this.label.SETTINGS.ADMIN,
        pipes: ['yes-no']
      },
      {
        key: "isChecked",
        label: this.label.SETTINGS.IS_MENU_IN_GROUP,
        inputType: 'mat-slide-toggle'
      },
      { key: "action", label: this.label.COMMON.ACTIONS }

    ];
  }

  onRowClick(row: any) {
    if (row.key == 'isChecked') {
      // Prevent row click action
      if (row.element.isChecked) {
        this.showLoading = true;
        if (row.element.id) {
          this.service.update({
            menuId: row.element.menuId,
            groupId: this.groupId,
            id: row.element.id,
            canInsert: row.element.canInsert,
            canUpdate: row.element.canUpdate,
            canDelete: row.element.canDelete,
            access: row.element.access,
            admin: row.element.admin
          }).subscribe({
            next: (res => {
              this.fetchData();
            }),
            error: (err => {
              this.fetchData();
            })
          })

        } else {
          this.service.create({
            menuId: row.element.menuId,
            groupId: this.groupId,
            canInsert: row.element.canInsert,
            canUpdate: row.element.canUpdate,
            canDelete: row.element.canDelete,
            access: row.element.access,
            admin: row.element.admin
          }).subscribe({
            next: (res => {
              this.fetchData();
            }),
            error: (err => {
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
            }),
            error: (err => {
              this.fetchData();
            })
          });

        }
      }

    }
  }

  onEdit(row: any) {
    const dialogRef = this.dialog.open(GroupMenuDialogFormComponent, {
      disableClose: true,
      data: row
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });

  }

}
