import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Menu } from '../../../../models/menus/menu';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { MenuService } from '../../../../services/menu-service';
import { PaginateRsult } from '../../../../models/paginate-result';
import { GroupMenuService } from '../../../../services/group-menu-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Labels } from '../../../../models/consts/labels';
import { LanguageService } from '../../../../services/language-service';
import { GroupMenu } from '../../../../models/group-menu/group-menu';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { UpsertCollectionOfMenusCommand, UpsertManuCommand } from '../../../../models/group-menu/upsert-collection-of-group-menu';
import { SuccessSnackbar } from '../../../../components/snackbars/success-snackbar/success-snackbar';
import { ErrorHandlerService } from '../../../../services/error-handler.service';

@Component({
  selector: 'app-menu-setting-component',
  standalone: false,
  templateUrl: './menu-setting-component.html',
  styleUrl: './menu-setting-component.scss'
})
export class MenuSettingComponent extends TableFormComponent<Menu> {

  selectedMenus: Menu[] = [];
  @Input() groupId!: number;
  groupMenus: GroupMenu[] = [];
  override data: PaginateRsult<any> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: any = {
    username: null,
    personsIdN: null,
    page: 0,
    pageSize: 10
  };


  override displayColumns: DisplayColumn[] = [
    {
      key: "select",
      label: "Select",
    },
    {
      key: "id",
      label: "Menu Id",
    },
    {
      key: "name",
      label: "Menu Name",
    },
    {
      key: "parentName",
      label: "Parent",
    },
    {
      key: "admin",
      label: "Admin",
      inputType: 'mat-slide-toggle'
    },
    {
      key: "access",
      label: "Access",
      inputType: 'mat-slide-toggle'
    },
    {
      key: "canInsert",
      label: "Can Insert",
      inputType: 'mat-slide-toggle'
    },
    {
      key: "canUpdate",
      label: "Can Update",
      inputType: 'mat-slide-toggle'
    },
    {
      key: "canDelete",
      label: "Can Delete",
      inputType: 'mat-slide-toggle'
    },

  ]

  constructor(
    override service: MenuService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private groupMenuService: GroupMenuService,
    protected dialog: MatDialog,
    override langService: LanguageService

  ) {
    super(service, cdr, fb, router, errorHandler, route,langService);
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  override fetchData() {
    this.showLoading = true;
    this.service.searchMenu(this.params).subscribe({
      next: (users => {
        this.data = users;
        this.selectedMenus = this.data.collection;
        this.groupMenuService.getAllGroupMenu({
          groupId: this.groupId
        }).subscribe({
          next: (groupMenus => {
            this.groupMenus = groupMenus;
            this.data.collection.forEach(menu => {
              const menuGroup = this.groupMenus.find(g => g.menuId === menu.id);
              menu.isChecked = menuGroup != null;
              if (menuGroup) {
                menu.canInsert = menuGroup.canInsert;
                menu.canUpdate = menuGroup.canUpdate;
                menu.canDelete = menuGroup.canDelete;
                menu.access = menuGroup.access;
                menu.admin = menuGroup.admin;

              }
            });

            this.showLoading = false;
            this.cdr.markForCheck();
          }),
          error: (err => {
            this.showLoading = false;
            this.cdr.markForCheck();

          })
        })

      }),
      error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();

      })
    })
  }

  onSelectionChange(selectedRows: Menu[]) {
    this.selectedMenus = selectedRows;
    this.cdr.markForCheck();
  }


  onAddMenu() {

    let menus: UpsertManuCommand[] = [];


    this.data.collection.forEach(menu => {
      menus.push({
        id: menu.id,
        isChecked: this.selectedMenus.find(x=>x.id == menu.id) != null,
        canInsert: menu.canInsert,
        canUpdate: menu.canUpdate,
        canDelete: menu.canDelete,
        access: menu.access,
        admin: menu.admin
      })
    });

    let params: UpsertCollectionOfMenusCommand = {
      menus: menus,
      groupId: this.groupId
    }
    this.showLoading = true;
    this.groupMenuService.upsertCollectionOfMenus(params).subscribe({
      next: (res => {
        this.showLoading = false;
        this.errorHandler.showSuccess("Users Added Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
      })
    })
  }

  onRowClick(row: { element: any; key: string }) {
    // const element = row.element;
    // let groupMenu: GroupMenu | null | undefined = this.groupMenus.find(g => g.menuId === element.id);

    // if (groupMenu) {
    //   groupMenu = togglePermission(groupMenu, row.key);
    //   if(groupMenu){
    //     this.showLoading = true;
    //     this.groupMenuService.update(groupMenu).subscribe({
    //       next: (res=>{
    //         this.snackBar.openFromComponent(SuccessSnackbar , {
    //           data: "Updated Successfully"
    //         })
    //         this.fetchData();
    //       }),error:(err=>{
    //         this.showLoading = false;
    //       })
    //     })
    //   }
    // }
  }


}


const permissionKeys = ['admin', 'access', 'canInsert', 'canUpdate', 'canDelete'] as const;
type PermissionKey = typeof permissionKeys[number];

function togglePermission(menuGroup: GroupMenu, key: string): GroupMenu | null {
  if (permissionKeys.includes(key as PermissionKey)) {
    const k = key as PermissionKey; // safely cast after check
    menuGroup[k] = !menuGroup[k];
    return menuGroup;
  } else {
    return null
  }
}



