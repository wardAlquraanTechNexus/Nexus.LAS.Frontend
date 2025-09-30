import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing-module';
import { BaseTransactionsComponent } from './_base/base-transactions-component/base-transactions-component';
import { TransactionViewComponent } from './_base/transaction-view-component/transaction-view-component';
import { AllTransactionsComponent } from './all-transactions-component/all-transactions-component';
import { AllTransactionsTableComponent } from './all-transactions-component/all-transactions-table-component/all-transactions-table-component';
import { ComponentsModule } from '../../components/components-module';


@NgModule({
  declarations: [
    BaseTransactionsComponent,
    TransactionViewComponent,
    AllTransactionsComponent,
    AllTransactionsTableComponent,
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ComponentsModule
  ]
})
export class TransactionModule { }
