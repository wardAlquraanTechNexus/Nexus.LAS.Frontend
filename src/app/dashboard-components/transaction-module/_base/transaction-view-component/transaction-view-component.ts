import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
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

@Component({
  selector: 'app-transaction-view',
  standalone: false,
  templateUrl: './transaction-view-component.html',
  styleUrl: './transaction-view-component.scss'
})
export class TransactionViewComponent  implements OnInit {
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  currentLang: LanguageCode = 'en';

  @Output() backToTableEmit = new EventEmitter();
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

  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.transactionId = parseInt(params['id']);
        this.getTransaction();
      }else{
        this.backToTable();
      }
    });
    this.langService.language$.subscribe(lang => {
      this.applyLanguage(lang);
    });

  }

  private getTransaction() {
    this.showLoading = true;
    this.service.getDtoById(this.transactionId)
    .subscribe({
      next: (res => {
        this.transaction = res;
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
    switch (this.transaction?.status) {
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

  getPrivateStyle() {
    let borderColor = '#025EBA';
    let color = '#025EBA';
    if (!this.transaction?.private) {
      borderColor = '#423e3ede';
      color = '#423e3ede';
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTransaction();
      }
    });
  }

   backToTable(){
    this.transactionId = 0;
    this.router.navigate([], {
      relativeTo: this.route, 
      queryParams: {  }, 
    });
  }


 

}


