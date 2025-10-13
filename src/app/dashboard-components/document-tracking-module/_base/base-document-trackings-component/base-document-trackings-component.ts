import { ChangeDetectorRef, Component } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { DocumentTracking } from '../../../../models/document-tracking-models/document-tracking/document-tracking';
import { DocumentTrackingDto } from '../../../../models/document-tracking-models/document-tracking/dtos/document-tracking-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { GetPagingDocumentTrackingQuery } from '../../../../models/document-tracking-models/document-tracking/params/get-paging-document-tracking-param';
import { DocumentTrackingService } from '../../../../services/document-tracking-services/document-tracking-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { LanguageService } from '../../../../services/language-service';
import { MenuTree } from '../../../../models/menus/menu-tree';
import { DocumentTrackingDialogFormComponent } from '../../document-tracking-dialog-form-component/document-tracking-dialog-form-component';
import { downloadBlobFile } from '../../../_shared/shared-methods/downloadBlob';

@Component({
  selector: 'app-base-document-trackings-component',
  standalone: false,
  templateUrl: './base-document-trackings-component.html',
  styleUrl: './base-document-trackings-component.scss'
})
export class BaseDocumentTrackingsComponent extends TableFormComponent<DocumentTracking> {


  selectedDocumentTrackings: DocumentTrackingDto[] = [];
  override data: PaginateRsult<DocumentTrackingDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: GetPagingDocumentTrackingQuery = {
    searchBy: null,
    documentTrackingCode: null,
    registerIdc: null,
    registerIdn: null,
    personId: null,
    page: 0,
    pageSize: 10,
    orderBy: 'id',
    orderDir: 'desc'
  }

  currentMenu: MenuTree | null = null;

  constructor(
    override service: DocumentTrackingService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    protected menuService: MenuService,
    protected dialog: MatDialog,
    protected dlService: DynamicListService,
    override langService: LanguageService

  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }



  override ngOnInit(): void {
    let routerSplitted = this.router.url.split('/');
    let roterLen = routerSplitted.length;

    this.currentMenu = this.menuService.getMenuByPath(routerSplitted[roterLen - 1]);
    this.fetchData();



    this.subscribeLanguage();
  }


  override fetchData(): void {
    this.showLoading = true;
    this.loadingService.startLoading('Loading data');

    this.service.getPaging(this.params)
      .subscribe({
        next: (res => {
          this.data = res;
          this.showLoading = false;
          this.loadingService.stopLoading('Loading data');
          this.cdr.markForCheck();
        }),
        error: (err => {
          this.showLoading = false;
          this.loadingService.stopLoading('Loading data');
          this.errorHandler.handleApiError(err, 'Failed to load data');
          this.cdr.markForCheck();
        })
      })
  }



  deleteFpc(event: any) {
    return () => this.deleteAfterConfirm(event);
  }

  deleteAfterConfirm(event: any) {
    this.showLoading = true;
    this.service.delete(event.id).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Deleted Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }



  onSelectionChange(selectedRows: DocumentTrackingDto[]) {
    this.selectedDocumentTrackings = selectedRows;
    this.cdr.detectChanges();
  }



  onAddNew() {
    let fpcDto: DocumentTrackingDto = {
      id: 0,
      documentTrackingCode: '',
      referenceNumber: '',
      personId: 0,
      registerIdc: '',
      registerIdn: 0,
      description: ''
    };
    const dialogRef = this.dialog.open(DocumentTrackingDialogFormComponent, {
      disableClose: true,
      data: fpcDto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { id: result.id },
        });
      }
    })
  }

  onRowClick(event: any) {
    if (event.key == "referenceNumber" || event.key == "documentTrackingCode") {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { id: event.element.id },
      });
    }
  }
  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  getAuditTooltip(person: any): string {
    const createdBy = person?.createdBy || 'N/A';
    const createdAt = person?.createdAt ? new Date(person.createdAt).toLocaleDateString('en-GB') : 'N/A';
    const modifiedBy = person?.modifiedBy || 'N/A';
    const modifiedAt = person?.modifiedAt ? new Date(person.modifiedAt).toLocaleDateString('en-GB') : 'N/A';

    return `Created by: ${createdBy}\nCreated at: ${createdAt}\n\nModified by: ${modifiedBy}\nModified at: ${modifiedAt}`;
  }

  exportToExcel() {
    this.service.exportToExcel(this.params).subscribe(res => {
      // Assuming res.data is base64 string:
      const binaryString = atob(res.data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });


      downloadBlobFile(blob, res.fileName || 'export.xlsx');
    });
  }


  exportToPdf(id: number) {
    this.service.exportToPdf({ id: id }).subscribe(res => {
      // Assuming res.data is a base64 string
      const binaryString = atob(res.data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type: 'application/pdf'
      });

      downloadBlobFile(blob, res.fileName || 'report.pdf');
    });
  }

}
