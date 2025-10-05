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
import { TransactionInvoicesComponent } from './transaction-components/transaction-invoices-component/transaction-invoices-component';
import { TransactionInvoicesFormComponent } from './transaction-components/transaction-invoices-component/transaction-invoices-form-component/transaction-invoices-form-component';
import { TransactionInvoicesDialogFormComponent } from './transaction-components/transaction-invoices-component/transaction-invoices-dialog-form-component/transaction-invoices-dialog-form-component';
import { ActiveTransactionsComponent } from './active-transactions-component/active-transactions-component';
import { ActiveTransactionsTableComponent } from './active-transactions-component/active-transactions-table-component/active-transactions-table-component';
import { ActivePrivateTransactionsComponent } from './active-private-transactions-component/active-private-transactions-component';
import { ActivePrivateTransactionsTableComponent } from './active-private-transactions-component/active-private-transactions-table-component/active-private-transactions-table-component';
import { ActivePublicTransactionsComponent } from './active-public-transactions-component/active-public-transactions-component';
import { ActivePublicTransactionsTableComponent } from './active-public-transactions-component/active-public-transactions-table-component/active-public-transactions-table-component';
import { TransactionRegisterPersonCompanyFormDialogComponent } from './transaction-components/transaction-registers-component/transaction-register-person-company-form-dialog-component/transaction-register-person-company-form-dialog-component';
import { TransactionRegisterPersonCompanyFormComponent } from './transaction-components/transaction-registers-component/transaction-register-person-company-form-component/transaction-register-person-company-form-component';


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
    TransactionActionViewDialogComponent,
    TransactionInvoicesComponent,
    TransactionInvoicesFormComponent,
    TransactionInvoicesDialogFormComponent,
    ActiveTransactionsComponent,
    ActiveTransactionsTableComponent,
    ActivePrivateTransactionsComponent,
    ActivePrivateTransactionsTableComponent,
    ActivePublicTransactionsComponent,
    ActivePublicTransactionsTableComponent,
    TransactionRegisterPersonCompanyFormDialogComponent,
    TransactionRegisterPersonCompanyFormComponent

  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    ComponentsModule
  ]
})
export class TransactionModule { }
