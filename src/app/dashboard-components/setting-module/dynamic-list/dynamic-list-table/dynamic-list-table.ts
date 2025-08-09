import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListDialog } from './dynamic-list-dialog/dynamic-list-dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginateRsult } from '../../../../models/paginate-result';
import { GetDynamicListParam } from '../../../../models/dynamic-list/get-dynamic-list-param';
import { DynamicList } from '../../../../models/dynamic-list/dynamic-list';


@Component({
  selector: 'app-dynamic-list-table',
  standalone: false,
  templateUrl: './dynamic-list-table.html',
  styleUrl: './dynamic-list-table.scss'
})
export class DynamicListTable implements OnInit {


  parents: DynamicList[] = [];
  params: GetDynamicListParam = {
    mainListId: null,
    page: 0,
    pageSize: 10,
    id: null
  }
  showLoading = false;
  parent: DynamicList | null = null;
  dynamicLists!: PaginateRsult<DynamicList>;
  treeData: any[] = [];

  constructor(
    private dynamicListService: DynamicListService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    debugger
    this.route.queryParams.subscribe(params => {
      const id = params['parentId'];
      if (id) {
        this.params.mainListId = id;
      }else{
        this.params.mainListId = null;
      }
      this.fetchData();
      this.getPath();

    });
  }
  onPathClick(parent: DynamicList) {
    const queryParams = parent.mainListId ? { parentId: parent.mainListId } : {};

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      replaceUrl: true
    });
    this.params.mainListId = parent.mainListId || null
    this.loadData();
  }

  private fetchData() {
    this.showLoading = true;
    this.dynamicListService.getByParams(this.params).subscribe({
      next: (res => {
        this.dynamicLists = res;
        this.getTreeData();
        this.showLoading = false;
        this.cdr.detectChanges();

      }),
      error: (err => {
        this.showLoading = false;
      })
    });
  }

  private getPath() {
    if (this.params.mainListId) {
      this.showLoading = true;
      this.dynamicListService.GetParents(this.params.mainListId).subscribe({
        next: (parents => {
          this.parents = parents;
          this.showLoading = false;
          this.cdr.markForCheck();
        }),
        error: (err => {
          this.showLoading = false;
          this.cdr.markForCheck();
        })
      });
    }
  }

  get reversedParents(): DynamicList[] {
    return [...this.parents].reverse();
  }



  getTreeData() {
    this.treeData = this.dynamicLists.collection.map(dl => ({
      name: dl.menuValue,
      id: dl.id
    }));
  }

  onView(node: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { parentId: node.id },
      replaceUrl: true
    });
    this.loadData();
  }

  onEdit(node: any) {
    let dl = this.dynamicLists.collection.find(x => x.id == node.id);
    this.dialog.open(DynamicListDialog, {
      disableClose: true,
      data: dl
    })
  }

  onDelete(node: any) {
    console.log("Delete:", node);
  }

  onAddNew() {
    this.dialog.open(DynamicListDialog, {
      disableClose: true,
      data: {
        id: 0,
        mainListId: this.params.mainListId,
        menuCategory: null,
        menuValue: null,
        active: false,
        rank: null
      }
    })
  }

}
