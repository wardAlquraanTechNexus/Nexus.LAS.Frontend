import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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
import { Subject, takeUntil } from 'rxjs';
import { BaseViewComponent } from '../../../base-components/base-view-component/base-view-component';
import { entityIcons } from '../../../../enums/entity-icon';

@Component({
  selector: 'app-fpc-table-view-component',
  standalone: false,
  templateUrl: './fpc-table-view-component.html',
  styleUrls: ['../../../_shared/styles/model-view-style.scss', './fpc-table-view-component.scss']
})
export class FpcTableViewComponent extends BaseViewComponent {

  override idc: EntityIDc = EntityIDc.FPCs;

  EntityIDc = EntityIDc;

  showFpcOd = true;
  showFpcOdActions = false;
  selectedOd!: FPCODDto;


  fpc!: FPCDto;
  showLoading = false;

  statuses = CommonStatus;


  constructor(
    private service: FPCService,
    override router: Router,
    override route: ActivatedRoute,
    override langService: LanguageService,
    private dialog: MatDialog,
    override cdr: ChangeDetectorRef,
  ) {
    super(cdr, langService, router, route);
  }

  override ngOnInit() {
    super.ngOnInit();
    // Subscribe to query params with unsubscribe logic

    if (this.id) {
      this.getFpc();
    } else {
      this.backToTable();
    }



  }



  private getFpc() {
    this.showLoading = true;

    this.service.getDtoById(this.id!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.fpc = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.showLoading = false;
          console.error('Error fetching FPC:', err);
        }
      });
  }

  navigateToTable() {
    this.backToTable();
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



  onEdit() {
    const dialogRef = this.dialog.open(FpcDialogFormComponent, {
      disableClose: true,
      data: this.fpc,
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



  onActionEdit() {
    this.showFpcOd = false;
    setTimeout(() => {
      this.showFpcOd = true;
      this.cdr.markForCheck();
    }, 100);
  }

  exportToPdf() {
    this.service.exportToPdf({ id: this.id! })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
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
        },
        error: (err) => {
          console.error('Error exporting PDF:', err);
        }
      });
  }
}


