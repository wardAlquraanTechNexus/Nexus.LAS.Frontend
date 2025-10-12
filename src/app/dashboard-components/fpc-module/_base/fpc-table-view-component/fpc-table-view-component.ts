import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FpcDialogFormComponent } from '../../fpc-dialog-form-component/fpc-dialog-form-component';
import { Labels } from '../../../../models/consts/labels';
import { EntityIDc } from '../../../../enums/entity-idc';
import { LanguageCode } from '../../../../models/types/lang-type';
import { FPCDto } from '../../../../models/fpc-models/fpc/dtos/fpc-dto';
import { CommonStatus } from '../../../../enums/common-status';
import { FPCService } from '../../../../services/fpc-services/fpc-service';
import { LanguageService } from '../../../../services/language-service';
import { MatDialog } from '@angular/material/dialog';
import { FPCODDto } from '../../../../models/fpc-models/fpc-od/dtos/fpc-od-dto';
import { downloadBlobFile } from '../../../_shared/shared-methods/downloadBlob';

@Component({
  selector: 'app-fpc-table-view-component',
  standalone: false,
  templateUrl: './fpc-table-view-component.html',
  styleUrls: ['./fpc-table-view-component.scss']
})
export class FpcTableViewComponent implements OnInit {
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  };

  EntityIDc = EntityIDc;


  showFpcOd = true;
  showFpcOdActions = false;
  selectedOd!: FPCODDto;

  currentLang: LanguageCode = 'en';

  @Output() backToTableEmit = new EventEmitter();
  fpc!: FPCDto;
  showLoading = false;
  fpcId = 0;

  idc = EntityIDc.FPCs;
  statuses = CommonStatus;

  selectedTab = 0;
  constructor(
    private service: FPCService,
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
        this.fpcId = parseInt(params['id']);
        this.getFpc();
      } else {
        this.backToTable();
      }
    });
    this.langService.language$.subscribe(lang => {
      this.applyLanguage(lang);
    });

  }

  private getFpc() {
    this.showLoading = true;
    this.service.getDtoById(this.fpcId)
      .subscribe({
        next: (res => {
          this.fpc = res;
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
  getStatusStyle() {
    let borderColor = '#9E77ED';
    let color = '#9E77ED';
    switch (this.fpc?.fpcStatus) {
      case CommonStatus.Active:
        borderColor = '#22C993';
        color = '#22C993';
        break;
      case CommonStatus.Inactive:
        borderColor = '#423e3ede';
        color = '#423e3ede';
        break;
    }

    return {
      'border': `2px solid ${borderColor}`,
      'color': color,
      'border-radius': '20px',
      'padding': '10px',

    };

  }

  getIcon() {
    switch (this.fpc?.fpcStatus) {
      case CommonStatus.Active:
        return 'check_circle';
      case CommonStatus.Inactive:
        return 'cancel';
      default:
        return 'star';
    }
  }

  getPrivateStyle() {
    let borderColor = '#025EBA';
    let color = '#025EBA';
    if (!this.fpc?.private) {
      borderColor = '#FFA500';
      color = '#FFA500';
    }
    return {
      'border': `2px solid ${borderColor}`,
      'color': color,
      'border-radius': '20px',
      'padding': '10px',

    };

  }

  protected applyLanguage(lang: LanguageCode) {
    this.currentLang = lang;
  }



  onEdit() {
    const dialogRef = this.dialog.open(FpcDialogFormComponent, {
      disableClose: true,
      data: this.fpc,
      width: '900px',
      maxWidth: '95vw',
      minWidth: '800px',
      panelClass: 'property-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getFpc();
      }
    });
  }

  loadFocOdActions(element: FPCODDto) {
    if (this.selectedOd && this.selectedOd.id == element.id) {
      return;
    }
    this.showFpcOdActions = false;
    this.selectedOd = element;
    setTimeout(() => {
      this.showFpcOdActions = true;
      this.cdr.markForCheck();
    }, 100);
  }

  backToTable() {
    this.fpcId = 0;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }


  onActionEdit() {
    this.showFpcOd = false;
    setTimeout(() => {
      this.showFpcOd = true;
      this.cdr.markForCheck();
    }, 100);
  }

  exportToPdf() {
    this.service.exportToPdf({ id: this.fpcId }).subscribe(res => {
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


