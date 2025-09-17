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
  selector: 'app-active-private-companies-table-component',
  standalone:false,
  templateUrl: './active-private-companies-table-component.html',
  styleUrls: ['./active-private-companies-table-component.scss', '../../_base/base-companies-component/base-companies-component.scss']
})
export class ActivePrivateCompaniesTableComponent  extends BaseCompaniesComponent {

    override params: GetCompanyQuery = {
      searchBy: null,
      private: true,
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
    super(service, cdr, fb, router, errorHandler, route, menuService, dialog, dlService , langService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    
  }

  override setDisplayColumns() {

    this.displayColumns = [
      { key: "select", label: this.currentLang === 'ar' ? 'اختيار' : 'Select' },
      { key: "companyCode", label: this.currentLang === 'ar' ? 'رمز الشركة' : 'Company Code', pipes: ["link"], sort: true },
      { key: "incorporationDate", label: this.currentLang === 'ar' ? 'تاريخ التأسيس' : 'Inc. Date', pipes: ["date"], sort: true },
      { key: "companyEnglishName", label: this.currentLang === 'ar' ? 'اسم الشركة بالإنجليزية' : 'Company Name (EN)', pipes: ["link"], sort: true },
      { key: "companyArabicName", label: this.currentLang === 'ar' ? 'اسم الشركة بالعربية' : 'Company Name (AR)', pipes: ["link"], sort: true },
      { key: "companyShortName", label: this.currentLang === 'ar' ? 'الاسم المختصر' : 'Short Name', pipes: ["link"], sort: true },
      { key: "companyStatus", label: this.currentLang === 'ar' ? 'حالة الشركة' : 'Company Status', pipes: ["company-Status"], sort: true },
      { key: "fpcCode", label: this.currentLang === 'ar' ? 'رمز FPC' : 'FPC Code', sort: true },
      { key: "private", label: this.currentLang === 'ar' ? 'خاص' : 'Private', pipes: ["private-Company"], sort: true },
      { key: "action", label: this.currentLang === 'ar' ? 'إجراء' : 'Action' }
    ];
  }


}