import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { CompanyChamberOfCommerce } from '../../../../models/company-models/company-champer-of-commerce/company-champer-of-commerce';
import { BaseParam } from '../../../../models/base/base-param';
import { GetCompanyChamperOfCommerceParams } from '../../../../models/company-models/company-champer-of-commerce/params/get-company-champer-of-commerce-command';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { CompanyChamperOfCommerceService } from '../../../../services/company-services/company-champer-of-commerce-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { CompanyChamberOfCommerceDTO } from '../../../../models/company-models/company-champer-of-commerce/dtos/company-champer-of-commerce-dto';
import { CompanyChamperOfCommerceFormDialogComponent } from './company-champer-of-commerce-form-dialog-component/company-champer-of-commerce-form-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyChamperOfCommerceViewDialog } from './company-champer-of-commerce-view-dialog/company-champer-of-commerce-view-dialog';
import { base64ToBlob } from '../../../_shared/shared-methods/downloadBlob';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-company-champer-of-commerce-component',
  standalone: false,
  templateUrl: './company-champer-of-commerce-component.html',
  styleUrl: './company-champer-of-commerce-component.scss'
})
export class CompanyChamperOfCommerceComponent extends TableFormComponent<CompanyChamberOfCommerce> {


  override params: GetCompanyChamperOfCommerceParams = {
    page: 0,
    pageSize: 10
  };
  @Input() company!: GetCompanyDto;

  constructor(
    override service: CompanyChamperOfCommerceService,
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
      imageUrl: null,
      file: null
    };
    const dialogRef = this.dialog.open(CompanyChamperOfCommerceFormDialogComponent, {
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
    if (row.dataFile && row.contentType) {
      const base64Data = row.dataFile;
      const blob = base64ToBlob(base64Data, row.contentType);
      const url = URL.createObjectURL(blob);
      row.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.cdr.markForCheck();
    }
    row.file = null;


    const dialogRef = this.dialog.open(CompanyChamperOfCommerceFormDialogComponent, {
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
    const dialogRef = this.dialog.open(CompanyChamperOfCommerceViewDialog, {
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
}
