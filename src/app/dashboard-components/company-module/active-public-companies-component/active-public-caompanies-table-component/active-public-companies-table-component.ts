import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyStatus } from '../../../../enums/company-status';
import { DisplayColumn } from '../../../../models/columns/display-column';
import GetCompanyQuery from '../../../../models/company-models/get-company-query/get-company-dto-command';
import { CompanyService } from '../../../../services/company-services/company-service';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { BaseCompaniesComponent } from '../../_base/base-companies-component/base-companies-component';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-active-public-companies-table-component',
  standalone: false,
  templateUrl: './active-public-companies-table-component.html',
  styleUrls: ['./active-public-companies-table-component.scss', '../../_base/base-companies-component/base-companies-component.scss']
})
export class ActivePublicCompaniesTableComponent extends BaseCompaniesComponent {
  override params: GetCompanyQuery = {
    searchBy: null,
    private: false,
    status: CompanyStatus.Active,
    page: 0,
    pageSize: 10,
    orderBy: 'id',
    orderDir: 'desc'
  }

  override displayColumns: DisplayColumn[] = [];
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
    
  }

  setDisplayColumns() {
    const labels = this.currentLang === 'ar'
      ? {
          select: 'اختيار',
          code: 'الرمز',
          incDate: 'تاريخ التأسيس',
          nameEn: 'الاسم بالإنجليزية',
          nameAr: 'الاسم بالعربية',
          shortName: 'الاسم المختصر',
          status: 'الحالة',
          fpcCode: 'رمز FPC',
          private: 'خاص',
          action: 'إجراء'
        }
      : {
          select: 'Select',
          code: 'Code',
          incDate: 'Inc. Date',
          nameEn: 'Name En',
          nameAr: 'Name Ar',
          shortName: 'Short Name',
          status: 'Status',
          fpcCode: 'FPC Code',
          private: 'Private',
          action: 'Action'
        };

    this.displayColumns = [
      { key: "select", label: labels.select },
      { key: "companyCode", label: labels.code, pipes: ["link"], sort: true },
      { key: "incorporationDate", label: labels.incDate, pipes: ["date"], sort: true },
      { key: "companyEnglishName", label: labels.nameEn, pipes: ["link"], sort: true },
      { key: "companyArabicName", label: labels.nameAr, pipes: ["link"], sort: true },
      { key: "companyShortName", label: labels.shortName, pipes: ["link"], sort: true },
      { key: "companyStatus", label: labels.status, pipes: ["company-Status"], sort: true },
      { key: "fpcCode", label: labels.fpcCode, sort: true },
      { key: "private", label: labels.private, pipes: ["private-Company"], sort: true },
      { key: "action", label: labels.action }
    ];
  }


}
