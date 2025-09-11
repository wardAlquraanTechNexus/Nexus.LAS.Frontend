import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CompanyContract } from '../../../../models/company-models/company-contract/company-contract';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { GetPagingCompanyContractQuery } from '../../../../models/company-models/company-contract/params/get-paging-company-contract';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { CompanyContractService } from '../../../../services/company-services/company-contract-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { CompanyContractDto } from '../../../../models/company-models/company-contract/dtos/company-contract-dto';
import { CompanyContractFormDialogComponent } from './company-contract-form-dialog-component/company-contract-form-dialog-component';
import { CompanyContractViewDialogComponent } from './company-contract-view-dialog-component/company-contract-view-dialog-component';
import { base64ToBlob, downloadBlob } from '../../../_shared/shared-methods/downloadBlob';
import { LanguageService } from '../../../../services/language-service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-company-contract-component',
  standalone: false,
  templateUrl: './company-contract-component.html',
  styleUrl: './company-contract-component.scss'
})
export class CompanyContractComponent extends TableFormComponent<CompanyContract> implements OnInit, OnDestroy {

  override displayColumns: DisplayColumn[] = [];

  private langSub!: Subscription;

  override params: GetPagingCompanyContractQuery = {
    companyId: 0,
    page: 0,
    pageSize: 10
  };
  @Input() company!: GetCompanyDto;

  constructor(
    override service: CompanyContractService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog,
    private languageService: LanguageService,
    private sanitizer: DomSanitizer,

  ) {
    super(service, cdr, fb, router, errorHandler, route)
  }

  override ngOnInit(): void {
    this.params.companyId = this.company.id;
    this.setDisplayColumns();
    this.langSub = this.languageService.language$.subscribe(() => {
      this.setDisplayColumns();
    });
    super.ngOnInit();
  }
 
  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.langSub?.unsubscribe();
  }

  setDisplayColumns() {
    const getLabel = this.languageService.getLabel.bind(this.languageService);
    this.displayColumns = [
      {
        key: "fileName",
        label: getLabel('COMMON.FILE_NAME') ?? "File Name",
        pipes: ["link"]
      },
      {
        key: "contractType",
        label: getLabel('COMPANY.CONTRACT_TYPE') ?? "Contract Type",
        pipes: ["company-contract-type"]
      },
      {
        key: "documentDate",
        label: getLabel('COMPANY.DOCUMENT_DATE') ?? "Document Date",
        pipes: ["date"]
      },
      {
        key: "commencementDate",
        label: getLabel('COMPANY.COMMENCEMENT_DATE') ?? "Commencement Date",
        pipes: ["date"]
      },
      {
        key: "contractExpiryDate",
        label: getLabel('COMPANY.EXPIRY_DATE') ?? "Expiry Date",
        pipes: ["date"]
      },
      {
        key: "contractExpiryActiveReminder",
        label: getLabel('COMPANY.REMINDER') ?? "Reminder",
        inputType: "mat-slide-toggle"
      },
      {
        key: "contractDescription",
        label: getLabel('COMPANY.DESCRIPTION') ?? "Description",
      },
      {
        key: "contractStatus",
        label: getLabel('COMPANY.STATUS') ?? "Status",
        pipes: ['company-contract-status']
      },
      {
        key: 'action',
        label: getLabel('COMMON.ACTIONS') ?? 'Actions'
      }
    ];
  }

  onAddNew() {
    let element: CompanyContractDto = {
      id: 0,
      companyId: this.company.id,
      contractType: 0,
      documentDate: "",
      commencementDate: "",
      contractExpiryDate: "",
      contractExpiryActiveReminder: false,
      contractDescription: '',
      contractStatus: null,
      file: null
    };
    const dialogRef = this.dialog.open(CompanyContractFormDialogComponent, {
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
    
    const dialogRef = this.dialog.open(CompanyContractFormDialogComponent, {
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
    const dialogRef = this.dialog.open(CompanyContractViewDialogComponent, {
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
    if (event.key == 'contractExpiryActiveReminder') {
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
    else if(event.key == 'fileName'){
      downloadBlob(event.element.dataFile , event.element.contentType , event.element.fileName);
    }
  }
}
