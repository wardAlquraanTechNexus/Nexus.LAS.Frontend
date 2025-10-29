import { ChangeDetectorRef, Component } from '@angular/core';
import { EntityIDc } from '../../../../enums/entity-idc';
import { DocumentTrackingDto } from '../../../../models/document-tracking-models/document-tracking/dtos/document-tracking-dto';
import { DocumentTrackingService } from '../../../../services/document-tracking-services/document-tracking-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../../services/language-service';
import { MatDialog } from '@angular/material/dialog';
import { DocumentTrackingDialogFormComponent } from '../../document-tracking-dialog-form-component/document-tracking-dialog-form-component';
import { downloadBlobFile } from '../../../_shared/shared-methods/downloadBlob';
import { takeUntil } from 'rxjs';
import { BaseViewComponent } from '../../../base-components/base-view-component/base-view-component';
import { entityIcons } from '../../../../enums/entity-icon';

@Component({
  selector: 'app-document-tracking-view',
  standalone: false,
  templateUrl: './document-tracking-view-component.html',
  styleUrls: ['../../../_shared/styles/model-view-style.scss', './document-tracking-view-component.scss']
})
export class DocumentTrackingViewComponent extends BaseViewComponent {

  override idc: EntityIDc = EntityIDc.DocumentTracking;

  showFpcOd = true;
  showFpcOdActions = false;

  documentTracking!: DocumentTrackingDto;
  showLoading = false;



  constructor(
    private service: DocumentTrackingService,
    override router: Router,
    override route: ActivatedRoute,
    override langService: LanguageService,
    private dialog: MatDialog,
    override cdr: ChangeDetectorRef,
  ) {
    super(cdr, langService , router, route);
  }

  override ngOnInit() {
    super.ngOnInit();
    // Subscribe to query params with unsubscribe logic
    if (this.id) {
      this.getDocumentTracking();
    } else {
      this.backToTable();
    }
  }



  private getDocumentTracking() {
    this.showLoading = true;

    this.service.getDtoById(this.id!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.documentTracking = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.showLoading = false;
          console.error('Error fetching document tracking:', err);
        }
      });
  }



  onEdit() {
    const dialogRef = this.dialog.open(DocumentTrackingDialogFormComponent, {
      disableClose: true,
      data: this.documentTracking,
      width: '900px',
      maxWidth: '95vw',
      minWidth: '800px',
      panelClass: 'property-dialog-panel'
    });

    // Subscribe to dialog close with unsubscribe logic
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.getDocumentTracking();
        }
      });
  }



  exportToPdf() {
    this.service.exportToPdf({ id: this.id! })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          // Convert base64 to blob
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
        },
        error: (err) => {
          console.error('Error exporting PDF:', err);
        }
      });
  }
}


