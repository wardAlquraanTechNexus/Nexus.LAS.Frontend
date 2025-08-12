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


  rowsPerPageOptions = [5, 10, 25, 50, 100]
  parents: DynamicList[] = [];
  params: GetDynamicListParam = {
    parentId: null,
    page: 0,
    pageSize: 10,
    id: null,
    name:null
  }
  showLoading = false;
  parent: DynamicList | null = null;
  dynamicLists: PaginateRsult<DynamicList> = {
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    collection: []
  };
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

    this.params.parentId = parent?.id || null;
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
        if (this.params.parentId) {
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
    if (this.params.parentId) {
      this.showLoading = true;
      this.dynamicListService.GetParents(this.params.parentId).subscribe({
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
      name: dl.name,
      id: dl.id
    }));
    this.treeData = [...this.treeData]; // new array reference
    this.cdr.markForCheck();           // force CD now
  }
  onView(node: any) {
    this.params.parentId = node.id;
    this.params.page = 0;
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
        this.dynamicLists.pageSize--;
        this.dynamicLists.totalRecords--;

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
    let dl: DynamicList = {
      id: 0,
      parentId: this.params.parentId,
      name: "",
      active: false,
      rank: 0
    }
    const dialogRef = this.dialog.open(DynamicListDialog, {
      disableClose: true,
      data: dl
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dynamicLists.collection = [
          ...this.dynamicLists.collection,
          result
        ];
        this.dynamicLists.pageSize++;
        this.dynamicLists.totalRecords++;
        this.getTreeData();
      }
    });
  }

  onPrev() {
    this.params.page--;
    this.params.name = null;
    this.loadData();
  }
  onNext() {
    this.params.page++;
    this.params.name = null;
    this.loadData();
  }

  onSearchByName(){
    this.loadData();
  }

}
