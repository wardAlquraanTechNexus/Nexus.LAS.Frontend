import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing-module';
import { BaseTransactionsComponent } from './_base/base-transactions-component/base-transactions-component';
import { TransactionViewComponent } from './_base/transaction-view-component/transaction-view-component';
import { AllTransactionsComponent } from './all-transactions-component/all-transactions-component';
import { AllTransactionsTableComponent } from './all-transactions-component/all-transactions-table-component/all-transactions-table-component';
import { ComponentsModule } from '../../components/components-module';
import { TransactionOverviewComponent } from './transaction-components/transaction-overview-component/transaction-overview-component';
import { TransactionRegisterFormComponent } from './transaction-components/transaction-registers-component/transaction-register-form-component/transaction-register-form-component';
import { TransactionRegisterDialogFormComponent } from './transaction-components/transaction-registers-component/transaction-register-dialog-form-component/transaction-register-dialog-form-component';
import { TransactionRegistersComponent } from './transaction-components/transaction-registers-component/transaction-registers-component';
import { TransactionActionsComponent } from './transaction-components/transaction-actions-component/transaction-actions-component';
import { TransactionActionsDialogFormComponent } from './transaction-components/transaction-actions-component/transaction-actions-dialog-form-component/transaction-actions-dialog-form-component';
import { TransactionActionsFormComponent } from './transaction-components/transaction-actions-component/transaction-actions-form-component/transaction-actions-form-component';
import { TransactionActionViewDialogComponent } from './transaction-components/transaction-actions-component/transaction-action-view-dialog-component/transaction-action-view-dialog-component';


@NgModule({
  declarations: [
    BaseTransactionsComponent,
    TransactionViewComponent,
    AllTransactionsComponent,
    AllTransactionsTableComponent,
    TransactionOverviewComponent,
    TransactionRegistersComponent,
    TransactionRegisterFormComponent,
    TransactionRegisterDialogFormComponent,
    TransactionActionsComponent,
    TransactionActionsDialogFormComponent,
    TransactionActionsFormComponent,
    TransactionActionViewDialogComponent

  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ComponentsModule
  ]
})
export class TransactionModule { }
