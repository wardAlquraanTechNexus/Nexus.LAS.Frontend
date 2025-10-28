import { Component } from '@angular/core';
import { TransactionViewComponent } from '../_base/transaction-view-component/transaction-view-component';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-active-transactions-component',
  standalone: false,
  templateUrl: './active-transactions-component.html',
  styleUrl: './active-transactions-component.scss'
})
export class ActiveTransactionsComponent extends BaseTableViewComponent
{

}
