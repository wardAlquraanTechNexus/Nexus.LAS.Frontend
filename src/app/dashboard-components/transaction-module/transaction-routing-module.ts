import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../../../environment/environment';
import { AllTransactionsComponent } from './all-transactions-component/all-transactions-component';

const routes: Routes = [
  {
    path: environment.routes.AllTransactions,
    component: AllTransactionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
