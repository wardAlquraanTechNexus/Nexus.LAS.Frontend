import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-document-tracking-view',
  standalone: false,
  templateUrl: './document-tracking-view-component.html',
  styleUrls: ['./document-tracking-view-component.scss']
})
export class DocumentTrackingViewComponent  implements OnInit {
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  };

  EntityIDc = EntityIDc;


  showFpcOd = true;
  showFpcOdActions = false;

  currentLang: LanguageCode = 'en';

  @Output() backToTableEmit = new EventEmitter();
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

  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.documentTrackingId = parseInt(params['id']);
        this.getDocumentTracking();
      } else {
        this.backToTable();
      }
    });
    this.langService.language$.subscribe(lang => {
      this.applyLanguage(lang);
    });

  }

  private getDocumentTracking() {
    this.showLoading = true;
    this.service.getDtoById(this.documentTrackingId)
      .subscribe({
        next: (res => {
          this.documentTracking = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        }), error: (err => {
          this.showLoading = false;
        })
      });
  }

  navigateToTable() {
    this.backToTableEmit.emit();
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

    dialogRef.afterClosed().subscribe(result => {
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
    this.service.exportToPdf({ id: this.documentTrackingId }).subscribe(res => {
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


