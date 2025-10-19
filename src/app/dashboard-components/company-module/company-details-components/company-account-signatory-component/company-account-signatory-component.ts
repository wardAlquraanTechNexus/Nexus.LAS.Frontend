import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CompanyBankAccountDto } from '../../../../models/company-models/company-bank-account/dtos/company-bank-account-dto';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { CompanyAccountSignatory } from '../../../../models/company-models/company-account-signatory/company-account-signatory';
import { PaginateRsult } from '../../../../models/paginate-result';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { GetCompanyAccountSignatoryParams } from '../../../../models/company-models/company-account-signatory/params/get-company-account-signatory';
import { CompanyAccountSignatoryService } from '../../../../services/company-services/company-account-signatory-service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { FormBuilder } from '@angular/forms';
import { CompanyAccountSignatoryDto } from '../../../../models/company-models/company-account-signatory/dtos/company-account-signatory-dto';
import { CompanyAccountSignatoryDialogFormComponent } from './company-account-signatory-dialog-form-component/company-account-signatory-dialog-form-component';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-company-account-signatory-component',
  standalone:false,
  templateUrl: './company-account-signatory-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class CompanyAccountSignatoryComponent  extends TableFormComponent<CompanyAccountSignatory> {

  override data: PaginateRsult<CompanyAccountSignatoryDto> = {
    collection: [],
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0
  };

 

  override params: GetCompanyAccountSignatoryParams = {
    companyBankAccountId: 0,
    page: 0,
    pageSize: 10
  };
  @Input() companyBankAccount!: CompanyBankAccountDto;

  constructor(
    override service: CompanyAccountSignatoryService,
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
    this.params.companyBankAccountId = this.companyBankAccount.id;

    // Apply label logic based on langService.getLabel
   

    super.ngOnInit();
  }

  override setDisplayColumns(): void {
     this.displayColumns = [
      {
        key:"personId",
        label: this.langService.getLabel('COMPANY.ACCOUNT_SIGNATORIES') || "Account Signatory",
        pipes:["person" , "link"]
      },
      {
        key:"rule",
        label: this.langService.getLabel('COMMON.RULE') || "Rule",
        pipes:["rule"]
      },
      {
        key:"fromAmount",
        label: this.langService.getLabel('COMPANY.FROM_AMOUNT') || "From Amount"
      },
      {
        key:"toAmount",
        label: this.langService.getLabel('COMPANY.TO_AMOUNT') || "To Amount"
      },
      {
        key:"description",
        label: this.langService.getLabel('COMPANY.DESCRIPTION') || "Description"
      },
      {
        key:"accountSignatoryDate",
        label: this.langService.getLabel('COMMON.DATE_OF_APPOINTMENT') || "Appointment Date",
        pipes:["date"]
      },
      {
        key:"accountSignatoryActive",
        label: this.langService.getLabel('COMMON.ACTIVE') || "Active",
        pipes:['signatory-active']
      },
      {
        key: 'action',
        label: this.langService.getLabel('COMMON.ACTIONS') || "Actions"
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
    const element: CompanyAccountSignatoryDto = {
      id: 0,
      companyBankAccountId: this.companyBankAccount.id,
      personId: null,
      rule: null,
      fromAmount: 0,
      toAmount: 0,
      description: "",
      accountSignatoryDate: "",
      cessationDate: null,
      accountSignatoryActive: false
    };
    const dialogRef = this.dialog.open(CompanyAccountSignatoryDialogFormComponent, {
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
    const element = {...row};
    const dialogRef = this.dialog.open(CompanyAccountSignatoryDialogFormComponent, {
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