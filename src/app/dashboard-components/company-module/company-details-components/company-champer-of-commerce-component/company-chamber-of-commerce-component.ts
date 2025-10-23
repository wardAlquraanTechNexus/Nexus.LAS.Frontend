import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { CompanyChamberOfCommerce } from '../../../../models/company-models/company-chamber-of-commerce/company-chamber-of-commerce';
import { BaseParam } from '../../../../models/base/base-param';
import { GetCompanyChamberOfCommerceParams } from '../../../../models/company-models/company-chamber-of-commerce/params/get-company-chamber-of-commerce-command';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { CompanyChamberOfCommerceService } from '../../../../services/company-services/company-chamber-of-commerce-service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { CompanyChamberOfCommerceDTO } from '../../../../models/company-models/company-chamber-of-commerce/dtos/company-chamber-of-commerce-dto';
import { CompanyChamberOfCommerceFormDialogComponent } from './company-chamber-of-commerce-form-dialog-component/company-chamber-of-commerce-form-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyChamberOfCommerceViewDialog } from './company-chamber-of-commerce-view-dialog/company-chamber-of-commerce-view-dialog';
import { base64ToBlob } from '../../../_shared/shared-methods/downloadBlob';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-company-chamber-of-commerce-component',
  standalone: false,
  templateUrl: './company-chamber-of-commerce-component.html',
  styleUrl: './company-chamber-of-commerce-component.scss'
})
export class CompanyChamberOfCommerceComponent extends TableFormComponent<CompanyChamberOfCommerce> {


  formGroup = new FormGroup({
    expiryDate: new FormControl(null),
    activeReminder: new FormControl(null)
  });
  override params: GetCompanyChamberOfCommerceParams = {
    page: 0,
    pageSize: 10
  };
  @Input() company!: GetCompanyDto;

  constructor(
    override service: CompanyChamberOfCommerceService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    override langService: LanguageService
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService)
  }
  override ngOnInit(): void {
    this.params.companyIdn = this.company.id;
    
    super.ngOnInit();
  }

  override setDisplayColumns() {
     this.displayColumns = [
      {
        key: "cciNumber",
        label: this.langService.getLabel('COMPANY.CCI_NUMBER') || "CCI Number"
      },
      {
        key: "cciIssueDate",
        label: this.langService.getLabel('COMPANY.CCI_ISSUE_DATE') || "CCI Issue Date",
        pipes: ["date"]
      },
      {
        key: "cciExpiryDate",
        label: this.langService.getLabel('COMPANY.CCI_EXPIRY_DATE') || "CCI Expiry Date",
        pipes: ["date"]
      },
      {
        key: "cciExpiryActiveReminder",
        label: this.langService.getLabel('COMPANY.REMINDER') || "Reminder",
        inputType: "mat-slide-toggle"
      },
      {
        key: "cciUsername",
        label: this.langService.getLabel('COMPANY.CCI_USERNAME') || "Username"
      },
      {
        key: "cciPassword",
        label: this.langService.getLabel('COMPANY.CCI_PASSWORD') || "Password"
      },
      {
        key: "action",
        label: this.langService.getLabel('COMMON.ACTIONS') || "Actions"
      }
    ];
  }

  onAddNew() {
    let element: CompanyChamberOfCommerceDTO = {
      id: 0,
      companyIdn: this.company.id,
      cciNumber: "",
      cciIssueDate: null,
      cciExpiryDate: null,
      cciExpiryActiveReminder: false,
      cciUsername: "",
      cciPassword: "",
      file: null
    };
    const dialogRef = this.dialog.open(CompanyChamberOfCommerceFormDialogComponent, {
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
    row.removeFile = false;

    const dialogRef = this.dialog.open(CompanyChamberOfCommerceFormDialogComponent, {
      disableClose: true,
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  onView(row: any) {
    const dialogRef = this.dialog.open(CompanyChamberOfCommerceViewDialog, {
      disableClose: true,
      data: row
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


  onRowClick(event: any) {
    if (event.key == 'cciExpiryActiveReminder') {
      this.showLoading = true;
      this.service.update(event.element).subscribe({
        next: (res => {
          this.errorHandler.showSuccess("Updated Successfully");
          this.showLoading = false;
          this.cdr.markForCheck();
        }), error: (err => {
          this.showLoading = false;
        })
      })
    }
  }

  onActiveReminderSelect(event: any){
    this.params.cciExpiryActiveReminder = event;
    this.fetchData();
  }

  onExpiryDateSelect(event: any){
    this.params.cciExpiryDatePeriod = event;
    this.fetchData();
  }
}
