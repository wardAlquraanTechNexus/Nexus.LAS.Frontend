import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { TransactionService } from '../../../../services/transaction-services/transaction-service';
import { BaseTransactionsComponent } from '../../_base/base-transactions-component/base-transactions-component';
import { CommonStatus } from '../../../../enums/common-status';
import { GetTransactionQuery } from '../../../../models/transaction-models/transaction/params/get-transaction-query';

@Component({
  selector: 'app-active-public-transactions-table-component',
  standalone: false,
  templateUrl: './active-public-transactions-table-component.html',
  styleUrl: './active-public-transactions-table-component.scss'
})
export class ActivePublicTransactionsTableComponent extends BaseTransactionsComponent
{
  override params: GetTransactionQuery = {
      page: 0,
      pageSize: 10,
      orderBy: 'id',
      orderDir: 'desc',
      statuses: [CommonStatus.Active],
      privates: [false]
    }
  
  constructor(
    override service: TransactionService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    override menuService: MenuService,
    override dialog: MatDialog,
    override dlService: DynamicListService,
    override langService: LanguageService,
  ) {
    super(service, cdr, fb, router, errorHandler, route, menuService, dialog, dlService, langService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override setDisplayColumns() {
    this.displayColumns = [
      { key: "select", label: this.label.COMMON.SELECT },
      { 
        key: "transactionCode", 
        label: this.label.COMMON.CODE, 
        pipes: ["link"], 
        sort: true 
      },
      { 
        key: "transactionDate", 
        label: this.label.COMMON.DATE, 
        pipes: ["date"], 
        sort: true 
      },
      { 
        key: "subjectType", 
        label: this.label.TRANSACTION.SUBJECT_TYPE, 
        pipes: ["transaction-type"], 
        sort: true 
      },
      { 
        key: "subjectDescription", 
        label: this.label.COMMON.DESCRIPTION, 
        sort: true 
      },
      { 
        key: "status", 
        label: this.label.COMMON.STATUS, 
        sort: true ,
        pipes: ['common-status']
      },
      { 
        key: "private", 
        label: this.label.COMMON.PRIVATE, 
        sort: true ,
        pipes: ['private']
      },
      
      { key: "action", label: this.label.COMMON.ACTIONS }
    ];

   
  }

}
