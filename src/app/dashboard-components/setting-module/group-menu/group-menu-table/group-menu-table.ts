import { ChangeDetectorRef, Component } from '@angular/core';
import { GroupMenu } from '../../../../models/group-menu/group-menu';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { PaginateRsult } from '../../../../models/paginate-result';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { GroupMenuService } from '../../../../services/group-menu-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, takeUntil, tap } from 'rxjs';
import { GroupMenuFormDialog } from './group-menu-form-dialog/group-menu-form-dialog';
import { Group } from '../../../../models/group/group';
import { Menu } from '../../../../models/menus/menu';
import { GroupService } from '../../../../services/group-service';
import { MenuService } from '../../../../services/menu-service';
import { LanguageService } from '../../../../services/language-service';
import { GroupMenuDTO } from '../../../../models/group-menu/dtos/group-menu-dto';
import { SearchGroupMenuQuery } from '../../../../models/group-menu/params/search-group-menu-query';

@Component({
  selector: 'app-group-menu-table',
  standalone: false,
  templateUrl: './group-menu-table.html',
  styleUrl: './group-menu-table.scss'
})
export class GroupMenuTable extends TableFormComponent<GroupMenu> {
  override data: PaginateRsult<GroupMenuDTO> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: SearchGroupMenuQuery = {
    menuName: null,
    groupName: null,
    groupId: null,
    menuId: null,
    page: 0,
    pageSize: 10
  };


  override displayColumns: DisplayColumn[] = [

    {
      key: "menuName",
      label: "Menu",
      sort: true
    },
    {
      key: "groupName",
      label: "Group",
      sort: true
    },
    {
      key: "access",
      label: "Access",
    },
    {
      key: "canInsert",
      label: "Insert",
    },
    {
      key: "canUpdate",
      label: "Update",
    },
    {
      key: "canDelete",
      label: "Delete",
    },
    {
      key: "admin",
      label: "Admin",
    },
    {
      key: "action",
      label: "Action",
    },

  ]
  formGroup!: FormGroup;


  loadGroupFn!: (search: string) => Observable<Group[]>;
  loadMenusFn!: (search: string) => Observable<Menu[]>;

  constructor(
    override service: GroupMenuService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    protected dialog: MatDialog,
    protected menuService: MenuService,
    protected groupService: GroupService,
    override langService: LanguageService
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.formGroup = this.fb.group({
      menuId: [''],
      groupId:['']
    });
    this.loadGroupFn = (search: string) => this.groupService.searchGroupByName(search).pipe(
      map(res=>{
        return res.collection
      })
    );
    this.loadMenusFn = (search: string) => this.getMenusByName(search).pipe(
      map(res=>{
        return res.collection
      })
    );
  }

  getMenusByName(menuName: string): Observable<PaginateRsult<Menu>> {
    return this.menuService.searchMenu({ name: menuName, pageSize: 100 });
  }
  override fetchData() {
    this.showLoading = true;
    this.loadingService.startLoading('Loading data');

    this.service.searchGroupMenu(this.params)
      .subscribe({
        next: (res => {
          this.data = res;
          this.showLoading = false;
          this.loadingService.stopLoading('Loading data');
          this.cdr.markForCheck();
        }),
        error: (err => {
          this.showLoading = false;
          this.loadingService.stopLoading('Loading data');
          this.errorHandler.handleApiError(err, 'Failed to load data');
          this.cdr.markForCheck();
        })
      })
  }


  onAddNew() {
    let groupMenu: GroupMenuDTO = {
      id: 0,
      menuId: 0,
      groupId: 0,
      access: false,
      canInsert: false,
      canUpdate: false,
      canDelete: false,
      admin: false,
      groupName: '',
      menuName: ''
    };
    const dialogRef = this.dialog.open(GroupMenuFormDialog, {
      disableClose: true,
      data: groupMenu
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
        this.menuService.getMenus().subscribe({
          
        });
      }
    });
  }

  edit(group: any) {
    const dialogRef = this.dialog.open(GroupMenuFormDialog, {
      disableClose: true,
      data: group
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
         this.menuService.getMenus().subscribe({
          
        });
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

  onSelectMenu(event:any){
    this.params.menuId = event;
    this.fetchData();
  }
  onSelectGroup(event:any){
    this.params.groupId = event;
    this.fetchData();
  }
}
