import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Injectable, OnInit, OnDestroy, Optional } from '@angular/core';
import { BaseService } from '../../../services/base/base-service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
import { LanguageCode } from '../../../models/types/lang-type';
import { Labels } from '../../../models/consts/labels';
import { LanguageService } from '../../../services/language-service';

@Injectable({ providedIn: 'root' })
export class TableFormComponent<T extends BaseEntity> implements OnInit, OnDestroy {
  protected destroy$ = new Subject<void>();
  protected loadingService!: LoadingStateService;
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  sortState: Sort = { active: '', direction: 'asc' };
  displayColumns: DisplayColumn[] = [];
  showLoading = false;
  data: PaginateRsult<any> = {
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
    protected errorHandler: ErrorHandlerService,
    protected route: ActivatedRoute,
    protected langService: LanguageService,
    loadingService?: LoadingStateService

  ) {
    this.loadingService = loadingService || new LoadingStateService();
  }

  ngOnInit(): void {
    this.fetchData();
    this.subscribeLanguage();
  }
  
  subscribeLanguage(){
    this.langService.language$.subscribe(lang => {
      this.applyLanguage(lang);
      this.setDisplayColumns();
    });
    
  }

  protected applyLanguage(lang: LanguageCode) {
    this.currentLang = lang;
    // Update column labels if updateColumnLabels method exists in child class
    if (typeof (this as any).updateColumnLabels === 'function') {
      (this as any).updateColumnLabels();
    }
    // Force new array reference to trigger change detection
    if (this.displayColumns && Array.isArray(this.displayColumns)) {
      this.displayColumns = [...this.displayColumns];
    }
    this.cdr.detectChanges();
  }

  setDisplayColumns() {}

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
