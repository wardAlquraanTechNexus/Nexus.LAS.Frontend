import { FlatTreeControl } from '@angular/cdk/tree';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { GetMenuParam } from '../../../../models/menus/params/get-menu-param';
import { MenuService } from '../../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../../../../models/menus/menu';
import { MenuDialog } from './menu-dialog/menu-dialog';
import { PaginateRsult } from '../../../../models/paginate-result';
import { LanguageService } from '../../../../services/language-service';
import { LanguageCode } from '../../../../models/types/lang-type';
import { Labels } from '../../../../models/consts/labels';

@Component({
  selector: 'app-menu-table-component',
  standalone: false,
  templateUrl: './menu-table-component.html',
  styleUrl: './menu-table-component.scss'
})
export class MenuTableComponent implements OnInit {
  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  parents: Menu[] = [];
  params: GetMenuParam = {
    page: 0,
    pageSize: 5,
    id: null,
    name:null,
    path:null,
    parentId: null
  }
  showLoading = false;
  menus: PaginateRsult<Menu> = {
    page:0,
    pageSize:10,
    totalPages:0,
    totalRecords:0,
    collection:[]
  };
  treeData: any[] = [];

  constructor(
    private menuService: MenuService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private langService: LanguageService
  ) {
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }
  ngOnInit(): void {
      this.loadData();
    }
  
    private loadData() {
      this.fetchData();
    }
    onPathClick(parent?: Menu | null) {
  
      this.params.parentId = parent?.id || null;
      if (!parent) {
        this.parents = [];
      }
      this.fetchData();
    }
    pathname = 'root';
    private fetchData() {
      this.showLoading = true;
      this.menuService.getByParams(this.params).subscribe({
        next: (res => {
          this.menus = res;
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
        this.menuService.GetParents(this.params.parentId).subscribe({
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
      this.treeData = this.menus.collection.map(dl => ({
        name: dl.name,
        id: dl.id
      }));
      this.treeData = [...this.treeData]; // new array reference
      this.cdr.markForCheck();           // force CD now
    }
    onView(node: any) {
      this.params.name = null;
      this.params.parentId = node.id;
      this.params.page = 0;
      this.loadData();
    }
  
    onEdit(node: any) {
      let menu = this.menus.collection.find(x => x.id == node.id);
      if (!menu) return;
  
      const dialogRef = this.dialog.open(MenuDialog, {
        disableClose: true,
        data: menu
      });
  
      dialogRef.afterClosed().subscribe(updatedItem => {
        if (updatedItem) {
          this.menus.collection = this.menus.collection.map(item =>
            item.id === updatedItem.id ? updatedItem : item
          );
  
          this.getTreeData();
        }
      });
    }
  
    onDelete(node: any) {
    this.showLoading = true;
    this.menuService.delete(node.id).subscribe({
      next: (res) => {
        this.menus.collection = this.menus.collection.filter(item => item.id !== node.id);
  
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
      let menu:Menu = {
         id: 0,
          parentId: this.params.parentId,
          name: "",
          description: "",
          path:null,
          rank: null,
          inDashboard:false,
          iconClass:null
      };
      const dialogRef = this.dialog.open(MenuDialog, {
        disableClose: true,
        data: menu
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.menus.collection = [
            ...this.menus.collection,
            result
          ];
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
