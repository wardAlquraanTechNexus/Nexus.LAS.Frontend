import { ChangeDetectorRef, Component } from '@angular/core';
import { BaseCompaniesComponent } from '../_base/base-companies-component/base-companies-component';
import { CompanyService } from '../../../services/company-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from '../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { DisplayColumn } from '../../../models/columns/display-column';
import { GetCompanyDto } from '../../../models/company/get-company-query/get-company-dto';
import { CompanyFormDialog } from '../company-form-dialog/company-form-dialog';

@Component({
  selector: 'app-all-companies-component',
  standalone: false,
  templateUrl: './all-companies-component.html',
  styleUrls: ['../_base/base-companies-component/base-companies-component.scss', './all-companies-component.scss']
})
export class AllCompaniesComponent extends BaseCompaniesComponent {

  override displayColumns: DisplayColumn[] = [
    // {
    //   key: "select",
    //   label: "",
    // },
    {
      key: "id",
      label: "id",
    },
    {
      key: "companyCode",
      label: "Code",
      pipes: ["link"],
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
      key: "action",
      label: "Action",
    },
  ]



  constructor(
    override service: CompanyService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override snackBar: MatSnackBar,
    override route: ActivatedRoute,
    override menuService: MenuService,
    override dialog: MatDialog,
    override dlService: DynamicListService
  ) {
    super(service, cdr, fb, router, snackBar, route, menuService, dialog, dlService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

  }


  onAddNew() {
    let companyDto: GetCompanyDto = {
      id: 0,
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
      private: false
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
