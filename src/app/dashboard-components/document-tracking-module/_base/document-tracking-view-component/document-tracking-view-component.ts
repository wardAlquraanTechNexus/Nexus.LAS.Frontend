import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Labels } from '../../../../models/consts/labels';
import { EntityIDc } from '../../../../enums/entity-idc';
import { LanguageCode } from '../../../../models/types/lang-type';
import { DocumentTrackingDto } from '../../../../models/document-tracking-models/document-tracking/dtos/document-tracking-dto';
import { DocumentTrackingService } from '../../../../services/document-tracking-services/document-tracking-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../../services/language-service';
import { MatDialog } from '@angular/material/dialog';
import { DocumentTrackingDialogFormComponent } from '../../document-tracking-dialog-form-component/document-tracking-dialog-form-component';
import { downloadBlobFile } from '../../../_shared/shared-methods/downloadBlob';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-document-tracking-view',
  standalone: false,
  templateUrl: './document-tracking-view-component.html',
  styleUrls: ['./document-tracking-view-component.scss']
})
export class DocumentTrackingViewComponent implements OnInit, OnDestroy {
  
  // Unsubscribe subject
  private destroy$ = new Subject<void>();

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  };

  EntityIDc = EntityIDc;

  showFpcOd = true;
  showFpcOdActions = false;

  currentLang: LanguageCode = 'en';

  documentTracking!: DocumentTrackingDto;
  showLoading = false;
  documentTrackingId = 0;

  idc = EntityIDc.DocumentTracking;

  selectedTab = 0;

  constructor(
    private service: DocumentTrackingService,
    private router: Router,
    private route: ActivatedRoute,
    protected langService: LanguageService,
    private dialog: MatDialog,
    protected cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // Subscribe to query params with unsubscribe logic
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['id']) {
          this.documentTrackingId = parseInt(params['id']);
          this.getDocumentTracking();
        } else {
          this.backToTable();
        }
      });

    // Subscribe to language changes with unsubscribe logic
    this.langService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.applyLanguage(lang);
      });
  }

  ngOnDestroy(): void {
    // Complete the destroy subject to unsubscribe from all observables
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getDocumentTracking() {
    this.showLoading = true;
    
    this.service.getDtoById(this.documentTrackingId)
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

  navigateToTable() {
    this.backToTable();
  }

  protected applyLanguage(lang: LanguageCode) {
    this.currentLang = lang;
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

  backToTable() {
    this.documentTrackingId = 0;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }

  exportToPdf() {
    this.service.exportToPdf({ id: this.documentTrackingId })
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


