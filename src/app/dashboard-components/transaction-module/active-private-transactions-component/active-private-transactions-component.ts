import { Component } from '@angular/core';
import { TransactionViewComponent } from '../_base/transaction-view-component/transaction-view-component';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-active-private-transactions-component',
  standalone: false,
  templateUrl: './active-private-transactions-component.html',
  styleUrl: './active-private-transactions-component.scss'
})
export class ActivePrivateTransactionsComponent extends BaseTableViewComponent
{

}
