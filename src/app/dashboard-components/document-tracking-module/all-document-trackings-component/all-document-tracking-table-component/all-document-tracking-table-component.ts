import { ChangeDetectorRef, Component } from '@angular/core';
import { DocumentTrackingService } from '../../../../services/document-tracking-services/document-tracking-service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { BaseFpcsComponent } from '../../../fpc-module/_base/base-fpcs-component/base-fpcs-component';
import { BaseDocumentTrackingsComponent } from '../../_base/base-document-trackings-component/base-document-trackings-component';

@Component({
  selector: 'app-all-document-tracking-table',
  standalone: false,
  templateUrl: './all-document-tracking-table-component.html',
  styleUrl: './all-document-tracking-table-component.scss'
})
export class AllDocumentTrackingTableComponent  extends BaseDocumentTrackingsComponent {
  override displayColumns: DisplayColumn[] = [];

  constructor(
    override service: DocumentTrackingService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    override menuService: MenuService,
    override dialog: MatDialog,
    override dlService: DynamicListService,
    override langService: LanguageService
  ) {
    super(service, cdr, fb, router, errorHandler, route, menuService, dialog, dlService, langService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override setDisplayColumns() {
     this.displayColumns = [
      // {
      //   key: "select",
      //   label: this.label.COMMON.SELECT
      // },
      {
        key: "documentTrackingCode",
        label: this.label.COMMON.CODE,
        pipes: ["link"],
        sort: true
      },
      {
        key: "referenceNumber",
        label: this.label.DOCUMENT_TRACKING.REFERENCE_NUMBER,
        pipes: ["link"],
        sort: true
      },
      {
        key: 'registerCode',
        label: this.label.DOCUMENT_TRACKING.REGISTER_CODE,
        sort: true,
      },
      { 
        key: 'registerIdc',
        label: this.label.DOCUMENT_TRACKING.REGISTER_TYPE,
        sort: true,
        pipes: ['register-type']
      },
      { 
        key: 'description',
        label: this.label.DOCUMENT_TRACKING.DESCRIPTION,
        sort: true,
        pipes: ['register-type']
      },
      {
        key: "actionType",
        label: this.label.COMMON.STATUS,
      },
      {
        key: 'action',
        label: this.label.COMMON.ACTIONS,
      }
    ];
  }

  updateColumnLabels() {
    this.setDisplayColumns();
  }
}
