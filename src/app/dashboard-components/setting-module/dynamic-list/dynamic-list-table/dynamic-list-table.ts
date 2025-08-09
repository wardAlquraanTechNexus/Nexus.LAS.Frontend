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
    this.fetchData();
  }
  onPathClick(parent?: DynamicList | null) {

    this.params.mainListId = parent?.id || null;
    if (!parent) {
      this.parents = [];
    }
    this.fetchData();
  }
  pathname = 'root';
  private fetchData() {
    this.showLoading = true;
    this.dynamicListService.getByParams(this.params).subscribe({
      next: (res => {
        this.dynamicLists = res;
        this.getTreeData();
        if (this.params.mainListId) {
          this.getPath();
        } else {
          this.showLoading = false;
          this.cdr.markForCheck();
        }

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




  getTreeData() {
    this.treeData = this.dynamicLists.collection.map(dl => ({
      name: dl.menuValue,
      id: dl.id
    }));
    this.treeData = [...this.treeData]; // new array reference
    this.cdr.markForCheck();           // force CD now
  }
  onView(node: any) {
    this.params.mainListId = node.id;
    this.loadData();
  }

  onEdit(node: any) {
    let dl = this.dynamicLists.collection.find(x => x.id == node.id);
    if (!dl) return;

    const dialogRef = this.dialog.open(DynamicListDialog, {
      disableClose: true,
      data: dl
    });

    dialogRef.afterClosed().subscribe(updatedItem => {
      if (updatedItem) {
        this.dynamicLists.collection = this.dynamicLists.collection.map(item =>
          item.id === updatedItem.id ? updatedItem : item
        );

        this.getTreeData();
      }
    });
  }

  onDelete(node: any) {
  this.showLoading = true;
  this.dynamicListService.delete(node.id).subscribe({
    next: (res) => {
      this.dynamicLists.collection = this.dynamicLists.collection.filter(item => item.id !== node.id);

      this.getTreeData();

      this.showLoading = false;
      this.cdr.markForCheck();
    },
    error: (err) => {
      this.showLoading = false;
      console.error('Delete failed', err);
    }
  });
}

  

  onAddNew() {
    const dialogRef = this.dialog.open(DynamicListDialog, {
      disableClose: true,
      data: {
        id: 0,
        mainListId: this.params.mainListId,
        menuCategory: null,
        menuValue: null,
        active: false,
        rank: null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dynamicLists.collection = [
          ...this.dynamicLists.collection,
          result
        ];
        this.getTreeData();
      }
    });
  }


}
