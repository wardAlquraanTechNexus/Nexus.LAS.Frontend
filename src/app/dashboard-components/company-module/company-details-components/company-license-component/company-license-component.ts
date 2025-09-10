import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { CompanyLicense } from '../../../../models/company-models/company-license/company-license';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { GetcompanyLicenseParams } from '../../../../models/company-models/company-license/params/get-company-license-params';
import { CompanyLicenseService } from '../../../../services/company-services/company-license-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { CompanyLicenseFormDialogComponent } from './company-license-form-dialog-component/company-license-form-dialog-component';
import { CompanyLicenseDto } from '../../../../models/company-models/company-license/dtos/company-license-dto';
import { CompanyLicenseStatus } from '../../../../enums/company-license-status';
import { MatDialog } from '@angular/material/dialog';
import { base64ToBlob } from '../../../_shared/shared-methods/downloadBlob';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyLicenseViewDialogComponent } from './company-license-view-dialog-component/company-license-view-dialog-component';

@Component({
  selector: 'app-company-license-component',
  standalone: false,
  templateUrl: './company-license-component.html',
  styleUrl: './company-license-component.scss'
})
export class CompanyLicenseComponent extends TableFormComponent<CompanyLicense> {




  override displayColumns: DisplayColumn[] = [
    {
      key: "licenseClassification",
      label: "Classifications"
    },
    {
      key: "licenseNumber",
      label: "Number"
    },
    {
      key: "licenseIssueDate",
      label: "Issue Date",
      pipes: ["date"]
    },
    {
      key: "licenseExpiryDate",
      label: "Expiry Date",
      pipes: ["date"]
    },
    {
      key: "licenseExpiryActiveReminder",
      label: "Reminder",
      inputType: "mat-slide-toggle"
    }
    ,
    {
      key: "licenseStatus",
      label: "Status",
      pipes: ['company-license-status']
    },
    {
      key:"licensePrimary",
      label: "Primary",
      pipes:['person-in-charge-primary']
    },
    {
      key: 'action',
      label: 'Actions'
    }
  ]

  override params: GetcompanyLicenseParams = {
    companyId: 0,
    page: 0,
    pageSize: 10
  };
  @Input() company!: GetCompanyDto;

  constructor(
    override service: CompanyLicenseService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,

  ) {
    super(service, cdr, fb, router, errorHandler, route)
  }
  override ngOnInit(): void {
    this.params.companyId = this.company.id;
    super.ngOnInit();
  }



  onAddNew() {
    let element: CompanyLicenseDto = {
      id: 0,
      companyIdn: this.company.id,
      licensePrimary: false,
      licenseStatus: CompanyLicenseStatus.Expired,
      licenseClassification: "",
      licenseNumber: "",
      licenseIssueDate: "",
      licenseExpiryDate: "",
      licenseExpiryActiveReminder: false,
      file: null,
    };
    const dialogRef = this.dialog.open(CompanyLicenseFormDialogComponent, {
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
    const dialogRef = this.dialog.open(CompanyLicenseFormDialogComponent, {
      disableClose: true,
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })

  }

  onView(row: any) {
    this.dialog.open(CompanyLicenseViewDialogComponent, {
      width: '900px',
      maxWidth: '98vw',
      data: row
    });
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
    if (event.key == 'licenseExpiryActiveReminder') {
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
