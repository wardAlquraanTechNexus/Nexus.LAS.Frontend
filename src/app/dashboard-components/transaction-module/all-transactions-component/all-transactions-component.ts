import { Component } from '@angular/core';
import { TransactionViewComponent } from '../_base/transaction-view-component/transaction-view-component';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-all-transactions-component',
  standalone: false,
  templateUrl: './all-transactions-component.html',
  styleUrl: './all-transactions-component.scss'
})
export class AllTransactionsComponent extends BaseTableViewComponent
{

}
