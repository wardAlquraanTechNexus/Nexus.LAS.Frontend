import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Company } from '../../../../models/company/company';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import GetCompanyQuery from '../../../../models/company/get-company-query/get-company-dto-command';
import { CompanyService } from '../../../../services/company-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { MenuTree } from '../../../../models/menus/menu-tree';
import { GetCompanyDto } from '../../../../models/company/get-company-query/get-company-dto';
import { PaginateRsult } from '../../../../models/paginate-result';

@Component({
  selector: 'app-base-companies-component',
  imports: [],
  templateUrl: './base-companies-component.html',
  styleUrl: './base-companies-component.scss'
})
export class BaseCompaniesComponent extends TableFormComponent<Company> implements OnInit {
  
   override data: PaginateRsult<GetCompanyDto> = {
      collection: [],
      totalPages: 0,
      totalRecords: 0,
      pageSize: 10,
      page: 0
    };
  
  override params: GetCompanyQuery = {
    searchBy: null,
    private: null,
    status: null,
    page: 0,
    pageSize: 10
  }

  columns = {
    code: true,
    nameEn: true,
    nameAr: true,
    status: true,
    private: true
  };

  currentMenu: MenuTree | null = null;


  constructor(
    override service: CompanyService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    protected menuService: MenuService,
    protected dialog: MatDialog,
    protected dlService: DynamicListService

  ) {
    super(service, cdr, fb, router, errorHandler, route);
  }

  override ngOnInit(): void {
    let routerSplitted = this.router.url.split('/');
    let roterLen = routerSplitted.length;

    this.currentMenu = this.menuService.getMenuByPath(routerSplitted[roterLen - 1]);
    this.fetchData();

    // this.loadNationalitiesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.nationality, search)

  }


  override fetchData(): void {
    this.showLoading = true;
    this.loadingService.startLoading('Loading data');

    this.service.getCompanies(this.params)
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

  


}
