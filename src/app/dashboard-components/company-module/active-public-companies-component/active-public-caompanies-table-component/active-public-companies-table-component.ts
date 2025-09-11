import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyStatus } from '../../../../enums/company-status';
import { DisplayColumn } from '../../../../models/columns/display-column';
import GetCompanyQuery from '../../../../models/company-models/get-company-query/get-company-dto-command';
import { CompanyService } from '../../../../services/company-services/company-service';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { BaseCompaniesComponent } from '../../_base/base-companies-component/base-companies-component';

@Component({
  selector: 'app-active-public-companies-table-component',
  standalone:false,
  templateUrl: './active-public-companies-table-component.html',
  styleUrls:[ './active-public-companies-table-component.scss', '../../_base/base-companies-component/base-companies-component.scss']
})
export class ActivePublicCompaniesTableComponent  extends BaseCompaniesComponent {

    override params: GetCompanyQuery = {
      searchBy: null,
      private: false,
      status: CompanyStatus.Active,
      page: 0,
      pageSize: 10,
      orderBy: 'id',
      orderDir: 'desc'
    }
  
    
  override displayColumns: DisplayColumn[] = [
    {
      key: "select",
      label: "Select",
    },
    {
      key: "companyCode",
      label: "Code",
      pipes: ["link"],
      sort: true
    },
    {
      key: "incorporationDate",
      label: "Inc. Date",
      pipes: [
        "date"
      ],
      sort: true
    },
    {
      key: "companyEnglishName",
      label: "Name En",
      pipes: ["link"],
      sort: true
    },
    {
      key: "companyArabicName",
      label: "Name Ar",
      pipes: ["link"],
      sort: true
    },
    {
      key: "companyShortName",
      label: "Short Name",
      pipes: ["link"],
      sort: true
    },
    {
      key: "companyStatus",
      label: "Status",
      pipes: ["company-Status"],
      sort: true
    },
    {
      key: "fpcCode",
      label: "FPC Code",
      // pipes: ["link"],
      sort: true
    },
    {
      key: "private",
      label: "Private",
      pipes: ["private-Company"],
      sort: true
    },
    {
      key: "action",
      label: "Action",
    },
  ]



  constructor(
    override service: CompanyService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    override menuService: MenuService,
    override dialog: MatDialog,
    override dlService: DynamicListService
  ) {
    super(service, cdr, fb, router, errorHandler, route, menuService, dialog, dlService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

  }
}
