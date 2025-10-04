import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment';
import { AllTransactionsComponent } from './all-transactions-component/all-transactions-component';
import { ActivePrivateTransactionsComponent } from './active-private-transactions-component/active-private-transactions-component';
import { ActivePublicTransactionsComponent } from './active-public-transactions-component/active-public-transactions-component';
import { ActiveTransactionsComponent } from './active-transactions-component/active-transactions-component';

const routes: Routes = [
  {
    path: environment.routes.AllTransactions,
    component: AllTransactionsComponent,
  },
  {
    path: environment.routes.ActivePrivateTransactions,
    component: ActivePrivateTransactionsComponent,
  },
  {
    path: environment.routes.ActivePublicTransactions,
    component: ActivePublicTransactionsComponent,
  },
  {
    path: environment.routes.ActiveTransactions,
    component: ActiveTransactionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
