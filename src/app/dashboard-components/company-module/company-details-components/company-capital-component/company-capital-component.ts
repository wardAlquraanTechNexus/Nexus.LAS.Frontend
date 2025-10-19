import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { CompanyCapital } from '../../../../models/company-models/company-capital/company-capital';
import { CompanyCapitalDto } from '../../../../models/company-models/company-capital/dtos/company-capital-dto';
import { GetPagingCompanyCapital } from '../../../../models/company-models/company-capital/params/get-paging-company-capital';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { CompanyCapitalService } from '../../../../services/company-services/company-capital-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { CompanyCapitalDialogFormComponent } from './company-capital-dialog-form-component/company-capital-dialog-form-component';
import { LanguageService } from '../../../../services/language-service';
import { Labels } from '../../../../models/consts/labels'; // Add this import

@Component({
  selector: 'app-company-capital-component',
  standalone: false,
  templateUrl: './company-capital-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']

})
export class CompanyCapitalComponent extends TableFormComponent<CompanyCapital> {


  override data: PaginateRsult<CompanyCapitalDto> = {
    collection: [],
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0
  };


  override params: GetPagingCompanyCapital = {
    companyId: 0,
    page: 0,
    pageSize: 10
  };
  @Input() company!: GetCompanyDto;

  constructor(
    override service: CompanyCapitalService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog,
    override langService: LanguageService
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService)
  }

  override ngOnInit(): void {
    this.params.companyId = this.company.id;

    super.ngOnInit();

  }

  override setDisplayColumns() {
    this.displayColumns = [

      {
        key: "capitalDate",
        label: this.langService.getLabel(this.label.COMMON.DATE) || "Date",
        pipes: ['date'],
      },
      {
        key: "capitalAmount",
        label: this.langService.getLabel(this.label.COMPANY.CAPITAL_AMOUNT) || "Amount",
        pipes: ['number'],
        decimals: 2
      },
      {
        key: "numberOfShares",
        label: this.langService.getLabel(this.label.COMPANY.TOTAL_SHARES) || "NO. of Shares",
        pipes: ['number'],
        decimals: 0  // No decimals for share counts
      },
      {
        key: "nominalValueOfShare",
        label: this.langService.getLabel(this.label.COMPANY.NOMINAL_VALUE_OF_SHARE) || "Nominal Value of share",
        pipes: ['currency'],
        compareKey: 'capitalCurrency',
        decimals: 2
      }, {
        key: "capitalAuthorized",
        label: this.langService.getLabel(this.label.COMPANY.AUTHORIZED_CAPITAL_AMOUNT) || "Authorized Capital Amount",
        pipes: ['currency'],
        compareKey: 'capitalCurrency',
        decimals: 2
      }, {
        key: "capitalPaid",
        label: this.langService.getLabel(this.label.COMPANY.PAID_CAPITAL_AMOUNT) || "Paid",
        pipes: ['currency'],
        compareKey: 'capitalCurrency',
        decimals: 2
      }, {
        key: "issuedShares",
        label: this.langService.getLabel(this.label.COMPANY.ISSUED_SHARES) || "Issued Shares",
        pipes: ['number'],
        decimals: 0  // No decimals for share counts
      }, {
        key: "classOfShares",
        label: this.langService.getLabel(this.label.COMPANY.CLASS_OF_SHARES) || "Class of Shares",
      }, {
        key: "capitalActive",
        label: this.langService.getLabel(this.label.COMMON.STATUS) || "Status",
        pipes: ['capital-active'],
      },
      {
        key: 'action',
        label: this.langService.getLabel(this.label.COMMON.ACTIONS) || "Actions"
      }
    ];

  }

  override fetchData(): void {
    this.showLoading = true;
    this.service.getPaging(this.params)
      .subscribe({
        next: (res => {
          this.data = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        }),
        error: (err => {
          this.showLoading = false;
          this.errorHandler.handleApiError(err, 'Failed to load data');
          this.cdr.markForCheck();
        })
      })
  }



  onAddNew() {
    const element: CompanyCapitalDto = {
      id: 0,
      companyId: this.company.id,
      capitalDate: null,
      capitalAmount: null,
      nominalValueOfShare: null,
      classOfShares: '',
      numberOfShares: null,
      capitalAuthorized: null,
      capitalPaid: null,
      issuedShares: null,
      capitalCurrency: '',
      capitalActive: false,

    };
    const dialogRef = this.dialog.open(CompanyCapitalDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(row: any) {
    const element = { ...row };
    const dialogRef = this.dialog.open(CompanyCapitalDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })

  }

  deleteFn(id: number) {
    return () => this.delete(id);
  }

  delete(id: number) {
    this.showLoading = true;
    this.service.delete(id).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Deleted Successfully");
        this.showLoading = false;
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
      })
    })
  }

  showTable = true;
  toggleTable() {
    this.showTable = !this.showTable;
  }



}
