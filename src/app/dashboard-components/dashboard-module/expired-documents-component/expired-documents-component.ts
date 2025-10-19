import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GlobalInfoDTO } from '../../../models/global-models/global-info/global-info-dto';
import { GlobalService } from '../../../services/global-services/global-service';
import { GlobalDocumentExpiredDto } from '../../../models/global-models/global-document-expired/global-document-expired';
import { PaginateRsult } from '../../../models/paginate-result';
import { BaseParam } from '../../../models/base/base-param';
import { TableFormComponent } from '../../base-components/table-form-component/table-form-component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { LanguageService } from '../../../services/language-service';
import { MenuService } from '../../../services/menu-service';
import { DisplayColumn } from '../../../models/columns/display-column';

@Component({
  selector: 'expired-documents',
  standalone: false,
  templateUrl: './expired-documents-component.html',
  styleUrl: './expired-documents-component.scss'
})
export class ExpiredDocumentsComponent extends TableFormComponent<GlobalDocumentExpiredDto> {

  override displayColumns: DisplayColumn[] = [
    {
      key: "mainIdc",
      label: "Main Type",
      pipes: ['register-type'],
      sort: true
    },
    {
      key: "subIdc",
      label: "Sub Type",
      pipes: ['register-type'],
      sort: true
    },
    {
      key: "expiryPeriod",
      label: "Expired Before",
      pipes: ['expired-before'],
      sort: true
    },
    {
      key: "expiryDate",
      label: "Expiry Date",
      pipes: ['date'],
      sort: true
    },
    {
      key: "activeReminder",
      label: "Active Reminder",
      inputType: 'mat-slide-toggle'
    }
  ]
  override data: PaginateRsult<GlobalDocumentExpiredDto> = {
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0,
    collection: []
  }
  override params: BaseParam = {
    page: 0,
    pageSize: 10
  }
  constructor(
    override service: GlobalService,
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


  override fetchData(): void {
    this.showLoading = true;
    this.service.globalExpiredDocuments(this.params).subscribe({
      next: (res => {
        this.data = res;
        this.showLoading = false;
        this.cdr.markForCheck();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }

  getExpiryStatus(expiryDate: any): 'critical' | 'warning' | 'normal' {
    if (!expiryDate) return 'normal';

    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) return 'critical'; // Already expired
    if (daysUntilExpiry <= 30) return 'warning'; // Expiring soon
    return 'normal';
  }

  getRowClass(row: GlobalDocumentExpiredDto): string {
    const status = this.getExpiryStatus(row.expiryDate);
    return `expiry-status-${status}`;
  }

}
