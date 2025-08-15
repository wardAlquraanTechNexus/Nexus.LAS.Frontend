import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Injectable, OnInit, OnDestroy, Optional } from '@angular/core';
import { BaseService } from '../../../services/base/base-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sort } from '@angular/material/sort';
import { DisplayColumn } from '../../../models/columns/display-column';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseParam } from '../../../models/base/base-param';
import { PaginateRsult } from '../../../models/paginate-result';
import { BaseEntity } from '../../../models/base/base-entity';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { LoadingStateService } from '../../../services/loading-state.service';

@Injectable({ providedIn: 'root' })
export class TableFormComponent<T extends BaseEntity> implements OnInit, OnDestroy {
  protected destroy$ = new Subject<void>();
  protected errorHandler!: ErrorHandlerService;
  protected loadingService!: LoadingStateService;
  
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
    protected route: ActivatedRoute,
    errorHandler?: ErrorHandlerService,
    loadingService?: LoadingStateService
  ) {
    // Fallback if services not provided
    this.errorHandler = errorHandler || new ErrorHandlerService(this.snackBar);
    this.loadingService = loadingService || new LoadingStateService();
  }

  ngOnInit(): void {
    this.fetchData();
  }



  fillParamsFromQP(): void {
    const params = this.route.snapshot.queryParams;
    Object.keys(this.params).forEach(key => {
      const paramKey = key as keyof BaseParam;
      if (params.hasOwnProperty(key)) {
        if (typeof this.params[paramKey] === 'number' && params[key] !== null) {
          (this.params[paramKey] as number) = +params[key];
        } else {
          (this.params[paramKey] as string) = params[key];
        }
      }
    });
  }






  search() {
    this.fetchData();
  }

  navigateByParams(): void {
    const queryParams: Record<string, string | number> = {};
    Object.keys(this.params).forEach(key => {
      const paramKey = key as keyof BaseParam;
      const value = this.params[paramKey];
      if (value !== null && value !== undefined && value !== '') {
        queryParams[key] = value;
      }
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge'
    });
    this.fetchData();
  }

  fetchData(): void {
    this.showLoading = true;
    this.loadingService.startLoading('Loading data');
    
    this.service.getByParams(this.params)
      .pipe(takeUntil(this.destroy$))
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


  changeSort(sortState: Sort) {
    if (this.sortState.active == sortState.active) {
      this.sortState.direction = this.sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortState.active = sortState.active;
      this.sortState.direction = sortState.direction;;
    }
    this.params.orderBy = this.sortState.active;
    this.params.orderDir = this.sortState.direction;
    this.fetchData();
  }

  changePage(pageEvent: BaseParam): void {
    this.params.page = pageEvent.page;
    this.params.pageSize = pageEvent.pageSize;
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
