import { Component } from '@angular/core';
import { TransactionViewComponent } from '../_base/transaction-view-component/transaction-view-component';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-active-public-transactions-component',
  standalone: false,
  templateUrl: './active-public-transactions-component.html',
  styleUrl: './active-public-transactions-component.scss'
})
export class ActivePublicTransactionsComponent extends BaseTableViewComponent
{

}
