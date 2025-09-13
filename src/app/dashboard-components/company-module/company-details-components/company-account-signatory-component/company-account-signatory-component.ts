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

  override displayColumns: DisplayColumn[] = [
    {
      key:"personId",
      label:"Account Signatory",
      pipes:["person" , "link"]
    },
    {
      key:"rule",
      label:"Rule",
      pipes:["rule"]
    },
    {
      key:"fromAmount",
      label:"From Amount"
    },
    {
      key:"toAmount",
      label:"To Amount"
    },
    {
      key:"description",
      label:"Description"
    },
    {
      key:"accountSignatoryDate",
      label:"Date of Appointment",
      pipes:["date"]
    },
    {
      key:"accountSignatoryActive",
      label:"Active",
      pipes:['signatory-active']
    },
    {
      key: 'action',
      label: 'Actions'
    }
  ]

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
    private dialog: MatDialog
  ) {
    super(service, cdr, fb, router, errorHandler, route)
  }
  override ngOnInit(): void {
    this.params.companyBankAccountId = this.companyBankAccount.id;
    super.ngOnInit();
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
      personId: 0,
      rule: 0,
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