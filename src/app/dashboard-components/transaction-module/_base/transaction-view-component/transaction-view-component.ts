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

@Component({
  selector: 'app-transaction-view',
  standalone: false,
  templateUrl: './transaction-view-component.html',
  styleUrl: './transaction-view-component.scss'
})
export class TransactionViewComponent implements OnInit, OnDestroy {
  
  // Unsubscribe subject
  private destroy$ = new Subject<void>();

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  };

  EntityIDc = EntityIDc;

  companyPersonRegisterTypes?: { idc: string, name: string }[];

  lawFirmRegisterTypes?: { idc: string, name: string }[];

  currentLang: LanguageCode = 'en';

  transaction!: TransactionDto;
  showLoading = false;
  transactionId = 0;

  idc = EntityIDc.Transactions;
  statuses = CommonStatus;

  selectedTab = 0;

  constructor(
    private service: TransactionService,
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
          this.transactionId = parseInt(params['id']);
          this.getTransaction();
        } else {
          this.backToTable();
        }
      });

    // Subscribe to language changes with unsubscribe logic
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

  ngOnDestroy(): void {
    // Complete the destroy subject to unsubscribe from all observables
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTransaction() {
    this.showLoading = true;
    
    this.service.getDtoById(this.transactionId)
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

  navigateToTable() {
    this.backToTable();
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

  protected applyLanguage(lang: LanguageCode) {
    this.currentLang = lang;
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
    this.service.exportToPdf({ id: this.transactionId })
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

  backToTable() {
    this.transactionId = 0;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
    });
  }
}


