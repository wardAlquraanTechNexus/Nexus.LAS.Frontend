import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { CompanyService } from '../../../../services/company-services/company-service';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { BaseCompaniesComponent } from '../../_base/base-companies-component/base-companies-component';
import { CompanyFormDialog } from '../../company-form-dialog/company-form-dialog';

@Component({
  selector: 'app-all-companies-table',
  standalone: false,
  templateUrl: './all-companies-table.html',
  styleUrls: ['./all-companies-table.scss', '../../_base/base-companies-component/base-companies-component.scss' ]
})
export class AllCompaniesTable extends BaseCompaniesComponent {

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
      pipes: ["companyStatus"],
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
      pipes: ["privateCompany"],
      sort: true
    },
    {
      key: "action",
      label: "Action",
    },
  ]
  showFilters = false;



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



  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onAddNew() {
    let companyDto: GetCompanyDto = {
      id: 0,
      companyIdc: "",
      companyCode: null,
      companyEnglishName: null,
      companyArabicName: null,
      companyShortName: null,
      companyStatus: 0,
      companyTypeIdn: null,
      companyClassIdn: null,
      groupCompanyIdn: null,
      relevantCompanyIdn: null,
      legalTypeIdn: null,
      cciNumber: null,
      cciIssueDate: null,
      cciExpiryDate: null,
      cciExpiryActiveReminder: null,
      placeOfRegistrationMainIdn: null,
      placeOfRegistrationSubIdn: null,
      capitalAmount: null,
      totalShares: null,
      numberOfPartners: null,
      updateDate: null,
      updateDescription: null,
      personsIdn: null,
      fpcCode: null,
      private: true,
      incorporationDate: null,
    };
    const dialogRef = this.dialog.open(CompanyFormDialog, {
      disableClose: true,
      data: companyDto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }


}
