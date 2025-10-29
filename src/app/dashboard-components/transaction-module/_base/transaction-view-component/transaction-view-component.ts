import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';
import { TransactionDto } from '../../../../models/transaction-models/transaction/dtos/transaction-dto';
import { EntityIDc } from '../../../../enums/entity-idc';
import { CommonStatus } from '../../../../enums/common-status';
import { TransactionService } from '../../../../services/transaction-services/transaction-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../../services/language-service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionDialogFormComponent } from '../../transaction-dialog-form-component/transaction-dialog-form-component';
import { downloadBlob } from '../../../_shared/shared-methods/downloadBlob';
import { Subject, takeUntil } from 'rxjs';
import { BaseViewComponent } from '../../../base-components/base-view-component/base-view-component';
import { entityIcons } from '../../../../enums/entity-icon';

@Component({
  selector: 'app-transaction-view',
  standalone: false,
  templateUrl: './transaction-view-component.html',
  styleUrls: ['../../../_shared/styles/model-view-style.scss', './transaction-view-component.scss']
})
export class TransactionViewComponent extends BaseViewComponent {

  EntityIDc = EntityIDc;

  companyPersonRegisterTypes?: { idc: string, name: string }[];

  lawFirmRegisterTypes?: { idc: string, name: string }[];

  transaction!: TransactionDto;
  showLoading = false;

  override idc = EntityIDc.Transactions;
  statuses = CommonStatus;


  constructor(
    private service: TransactionService,
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

    if (this.id) {
      this.getTransaction();
    } else {
      this.backToTable();
    }
  }

  override subscribeLang(): void {
    this.langService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.applyLanguage(lang);
        this.companyPersonRegisterTypes = [
          { idc: EntityIDc.Company, name: this.label.COMPANY.COMPANY },
          { idc: EntityIDc.Person, name: this.label.PERSON.PERSON },
        ];

        this.lawFirmRegisterTypes = [
          { idc: EntityIDc.LawFirm, name: this.label.LAW_FIRM.LAW_FIRM },
        ];
      });
  }


  private getTransaction() {
    this.showLoading = true;

    this.service.getDtoById(this.id!)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.transaction = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.showLoading = false;
          console.error('Error fetching transaction:', err);
        }
      });
  }



  getStatusStyle() {
    let borderColor = '#9E77ED';
    let color = '#9E77ED';

    switch (this.transaction?.status?.toString()) {
      case CommonStatus[CommonStatus.Active]:
        borderColor = '#22C993';
        color = '#22C993';
        break;
      case CommonStatus[CommonStatus.Inactive]:
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
    switch (this.transaction?.status?.toString()) {
      case CommonStatus[CommonStatus.Active]:
        return 'check_circle';
      case CommonStatus[CommonStatus.Inactive]:
        return 'cancel';
      default:
        return 'star';
    }
  }

  getPrivateStyle() {
    let borderColor = '#025EBA';
    let color = '#025EBA';

    if (!this.transaction?.private) {
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
    const dialogRef = this.dialog.open(TransactionDialogFormComponent, {
      disableClose: true,
      data: this.transaction,
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
          this.getTransaction();
        }
      });
  }

  exportToPdf() {
    this.service.exportToPdf({ id: this.id! })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          downloadBlob(res.data, 'application/pdf', res.fileName);
        },
        error: (err) => {
          console.error('Error exporting PDF:', err);
        }
      });
  }


}


