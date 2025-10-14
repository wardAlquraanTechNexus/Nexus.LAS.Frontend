import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { DocumentTrackingAction } from '../../../../models/document-tracking-models/document-tracking-action/document-tracking-action';
import { DocumentTrackingActionDto } from '../../../../models/document-tracking-models/document-tracking-action/dto/document-tracking-action-dto';
import { GetPagingDocumentTrackingActionQuery } from '../../../../models/document-tracking-models/document-tracking-action/params/get-paging-document-tracking-action-param';
import { DocumentTrackingDto } from '../../../../models/document-tracking-models/document-tracking/dtos/document-tracking-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { DocumentTrackingActionService } from '../../../../services/document-tracking-services/document-tracking-action-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { DocumentTrackingActionDialogFormComponent } from './document-tracking-action-dialog-form-component/document-tracking-action-dialog-form-component';

@Component({
  selector: 'app-document-tracking-action',
  standalone: false,
  templateUrl: './document-tracking-action-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss', './document-tracking-action-component.scss']
})
export class DocumentTrackingActionComponent extends TableFormComponent<DocumentTrackingAction> {

  @Input() documentTracking!: DocumentTrackingDto;
  actionTypes = [
    { "label" : "In" , "value" : "In" },
    { "label" : "Out" , "value" : "Out" }
  ]
  override params: GetPagingDocumentTrackingActionQuery = {
    page: 0,
    pageSize: 10,
    documentTrackingId: 0,
    actionType: null
  };
  override data: PaginateRsult<DocumentTrackingActionDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: DocumentTrackingActionService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog,
    private menuService: MenuService,
    override langService: LanguageService,
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit(): void {
    this.params.documentTrackingId = this.documentTracking.id;
    super.ngOnInit();


  }

  override setDisplayColumns() {
    this.displayColumns = [
      {
        key: "actionType",
        label: this.label.DOCUMENT_TRACKING.ACTION_TYPE,
        sort: true
      },
      {
        key: "actionDate",
        label: this.label.DOCUMENT_TRACKING.ACTION_DATE,
        pipes: ['date'],
        sort: true
      },
      {
        key: "actionDescription",
        label: this.label.DOCUMENT_TRACKING.ACTION_DESCRIPTION
      },
      {
        key: "action",
        label: this.label.COMMON.ACTIONS
      }
    ];
  }
  override fetchData() {
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
          this.loadingService.stopLoading('Loading data');
          this.errorHandler.handleApiError(err, 'Failed to load data');
          this.cdr.markForCheck();
        })
      })
  }

  showTable = true;
  toggleTable() {
    this.showTable = !this.showTable;
  }


  onAddNew() {
    let element: DocumentTrackingActionDto = {
      id: 0,
      documentTrackingId: this.documentTracking.id,
      actionType: '',
      actionDate: undefined,
      actionDescription: '',
    };

    const dialogRef = this.dialog.open(DocumentTrackingActionDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(element: DocumentTrackingActionDto) {

    const dialogRef = this.dialog.open(DocumentTrackingActionDialogFormComponent, {
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



}
