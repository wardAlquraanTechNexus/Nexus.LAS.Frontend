import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { CompanyService } from '../../../../services/company-services/company-service';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { BaseCompaniesComponent } from '../../_base/base-companies-component/base-companies-component';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-all-companies-table',
  standalone: false,
  templateUrl: './all-companies-table.html',
  styleUrls: ['./all-companies-table.scss', '../../_base/base-companies-component/base-companies-component.scss']
})
export class AllCompaniesTable extends BaseCompaniesComponent {
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
  }

  override setDisplayColumns() {
    this.displayColumns = [
      { key: "select", label: this.label.COMMON.SELECT },
      { key: "companyCode", label: this.label.COMPANY.CODE, pipes: ["link"], sort: true },
      { key: "incorporationDate", label: this.label.COMPANY.INC_DATE, pipes: ["date"], sort: true },
      { key: "companyEnglishName", label: this.label.COMMON.NAME_EN, pipes: ["link"], sort: true },
      { key: "companyArabicName", label: this.label.COMMON.NAME_AR, pipes: ["link"], sort: true },
      { key: "companyShortName", label: this.label.COMPANY.SHORT_NAME, pipes: ["link"], sort: true },
      { key: "companyStatus", label: this.label.COMPANY.STATUS, pipes: ["company-Status"], sort: true, hasIcon: true },
      { key: "fpcCode", label: this.label.COMPANY.FPC_CODE, sort: true },
      { key: "private", label: this.label.COMPANY.PRIVATE, pipes: ["private"], sort: true, hasIcon: true },
      { key: "action", label: this.label.COMMON.ACTIONS }
    ];
  }

  updateColumnLabels() {
    this.setDisplayColumns();
  }
}
