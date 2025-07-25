import { ChangeDetectorRef, Component, Injectable, OnInit } from '@angular/core';
import { BaseService } from '../../../services/base/base-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { DisplayColumn } from '../../../models/columns/display-column';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseParam } from '../../../models/base/base-param';
import { PaginateRsult } from '../../../models/paginate-result';

@Injectable({ providedIn: 'root' })
export class TableFormComponent<T> implements OnInit {

  sortState: Sort = { active: '', direction: 'asc' };
  displayColumns: DisplayColumn[] = [];
  showLoading = false;
  data: PaginateRsult<T> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  params: BaseParam = {
    page: 0,
    pageSize: 10,
  };

  constructor(
    protected service: BaseService<T>,
    protected cdr: ChangeDetectorRef,
    protected fb: FormBuilder,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.fillParamsFromQP();
    this.fetchData();
  }



  fillParamsFromQP() {
    const params = this.route.snapshot.queryParams;
    Object.keys(this.params).forEach(key => {
      if (params.hasOwnProperty(key)) {
        if (typeof (this.params as any)[key] === 'number' && params[key] !== null) {
          (this.params as any)[key] = +params[key];
        } else {
          (this.params as any)[key] = params[key];
        }
      }
    });
  }






  search() {
    this.navigateByParams();
  }

  navigateByParams() {
    const queryParams: any = {};
    Object.keys(this.params).forEach(key => {
      if ((this.params as any)[key] !== null && (this.params as any)[key] !== undefined && (this.params as any)[key] !== '') {
        queryParams[key] = (this.params as any)[key];
      }
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
    this.fetchData();
  }

  fetchData() {
    this.showLoading = true;
    this.service.getByParams(this.params).subscribe({
      next: (res => {
        this.data = res;
        this.showLoading = false;
        this.cdr.detectChanges();
      }),
      error: (err => {
        this.showLoading = false;
        this.cdr.detectChanges();

      })
    })
  }


  changeSort(sortState: Sort) {
    if (this.sortState.active == sortState.active) {
      this.sortState.direction = this.sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortState.active = sortState.active;
      this.sortState.direction = sortState.direction;;
    }
    this.params.orderBy = this.sortState.active;
    this.params.orderDir = this.sortState.direction;
    this.navigateByParams();
  }

  changePage(pageEvent: BaseParam) {
    this.params.page = pageEvent.page;
    this.params.pageSize = pageEvent.pageSize;
    this.navigateByParams();
  }




}
