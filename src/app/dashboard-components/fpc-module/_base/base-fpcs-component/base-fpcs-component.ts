import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonStatus } from '../../../../enums/common-status';
import { FPCDto } from '../../../../models/fpc-models/fpc/dtos/fpc-dto';
import { FPC } from '../../../../models/fpc-models/fpc/fpc';
import { GetFPCParam } from '../../../../models/fpc-models/fpc/params/get-fpc-param';
import { MenuTree } from '../../../../models/menus/menu-tree';
import { PaginateRsult } from '../../../../models/paginate-result';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { FPCService } from '../../../../services/fpc-services/fpc-service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { downloadBlobFile } from '../../../_shared/shared-methods/downloadBlob';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { FpcDialogFormComponent } from '../../fpc-dialog-form-component/fpc-dialog-form-component';

@Component({
  selector: 'app-base-fpcs-component',
  standalone: false,
  templateUrl: './base-fpcs-component.html',
  styleUrl: './base-fpcs-component.scss'
})
export class BaseFpcsComponent extends TableFormComponent<FPC> {

  activeStatus = CommonStatus.Active;
  inactiveStatus = CommonStatus.Inactive

  selectedFPCs: FPCDto[] = [];
  override data: PaginateRsult<FPCDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: GetFPCParam = {
    searchBy: null,
    private: null,
    status: null,
    page: 0,
    pageSize: 10,
    orderBy: 'id',
    orderDir: 'desc'
  }

  currentMenu: MenuTree | null = null;

  constructor(
    override service: FPCService,
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


  activate(event: any) {
    this.changeStatus(event, CommonStatus.Active);
  }
  deactivate(event: any) {
    this.changeStatus(event, CommonStatus.Inactive);
  }
  markPublic(event: any) {
    this.changePrivate(event, false);
  }
  markPrivate(event: any) {
    this.changePrivate(event, true);

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


  changeStatus(event: any, status: CommonStatus) {
    this.showLoading = true;
    this.service.updateStatus({
      ids: [event.id],
      status: status
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }

  changePrivate(event: any, isPrivate: boolean) {
    this.showLoading = true;
    this.service.updatePrivate({
      ids: [event.id],
      isPrivate: isPrivate
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }



  onSelectionChange(selectedRows: FPCDto[]) {
    this.selectedFPCs = selectedRows;
    this.cdr.detectChanges();
  }


  bulkChangeStatus(status: CommonStatus) {
    this.showLoading = true;
    this.service.updateStatus({
      ids: this.selectedFPCs.map(x => x.id),
      status: status
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.selectedFPCs = [];
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }
  bulkChangePrivate(isPrivate: boolean) {
    this.showLoading = true;
    this.service.updatePrivate({
      ids: this.selectedFPCs.map(x => x.id),
      isPrivate: isPrivate
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.selectedFPCs = [];

        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }



  onAddNew() {
    let fpcDto: FPCDto = {
      id: 0,
      fpcCode: '',
      registerIdc: '',
      registerIdn: 0,
      fpcStatus: CommonStatus.New,
      private: false,
    };
    const dialogRef = this.dialog.open(FpcDialogFormComponent, {
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
    if (event.key == "fpcCode" || event.key == "registerIdn" || event.key == "registerIdc") {
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
