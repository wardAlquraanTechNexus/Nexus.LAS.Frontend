import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { CompanyService } from '../../../../services/company-services/company-service';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { BaseCompaniesComponent } from '../../_base/base-companies-component/base-companies-component';
import GetCompanyQuery from '../../../../models/company-models/get-company-query/get-company-dto-command';
import { CompanyStatus } from '../../../../enums/company-status';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-active-companies-table-component',
  standalone: false,
  templateUrl: './active-companies-table-component.html',
  styleUrls: ['./active-companies-table-component.scss', '../../_base/base-companies-component/base-companies-component.scss']
})
export class ActiveCompaniesTableComponent extends BaseCompaniesComponent {

  override params: GetCompanyQuery = {
    searchBy: null,
    private: null,
    status: CompanyStatus.Active,
    page: 0,
    pageSize: 10,
    orderBy: 'id',
    orderDir: 'desc'
  }

  override displayColumns: DisplayColumn[] = [];

  private langSub!: Subscription;

  constructor(
    override service: CompanyService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    override menuService: MenuService,
    override dialog: MatDialog,
    override dlService: DynamicListService,
    override langService: LanguageService
  ) {
    super(service, cdr, fb, router, errorHandler, route, menuService, dialog, dlService, langService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.setDisplayColumns();
    this.langSub = this.langService.language$.subscribe(() => {
      this.setDisplayColumns();
    });
  }

  setDisplayColumns() {
    const l = this.langService.currentLanguage();
    const labels = this.langService.getLabel.bind(this.langService);

    this.displayColumns = [
      { key: "select", label: l === 'ar' ? 'اختيار' : 'Select' },
      { key: "companyCode", label: labels('COMPANY.CODE'), pipes: ["link"], sort: true },
      { key: "incorporationDate", label: l === 'ar' ? 'تاريخ التأسيس' : 'Inc. Date', pipes: ["date"], sort: true },
      { key: "companyEnglishName", label: labels('COMPANY.NAME_EN'), pipes: ["link"], sort: true },
      { key: "companyArabicName", label: labels('COMPANY.NAME_AR'), pipes: ["link"], sort: true },
      { key: "companyShortName", label: l === 'ar' ? 'الاسم المختصر' : 'Short Name', pipes: ["link"], sort: true },
      { key: "companyStatus", label: labels('COMPANY.STATUS'), pipes: ["company-Status"], sort: true },
      { key: "fpcCode", label: l === 'ar' ? 'رمز FPC' : 'FPC Code', sort: true },
      { key: "private", label: labels('COMPANY.PRIVATE'), pipes: ["private-Company"], sort: true },
      { key: "action", label: l === 'ar' ? 'إجراء' : 'Action' }
    ];
  }

  override ngOnDestroy(): void {
    this.langSub?.unsubscribe();
    super.ngOnDestroy?.();
  }
}
