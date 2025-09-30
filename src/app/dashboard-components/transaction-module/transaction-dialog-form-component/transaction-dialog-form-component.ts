import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Transaction } from '../../../models/transaction-models/transaction/transaction';
import { TransactionDto } from '../../../models/transaction-models/transaction/dtos/transaction-dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../services/language-service';
import { TransactionService } from '../../../services/transaction-services/transaction-service';
import { BaseDialogFormComponent } from '../../base-components/base-dialog-form-component/base-dialog-form-component';

@Component({
  selector: 'app-transaction-dialog-form-component',
  standalone: false,
  templateUrl: './transaction-dialog-form-component.html',
  styleUrl: './transaction-dialog-form-component.scss'
})
export class TransactionDialogFormComponent extends BaseDialogFormComponent<Transaction> {

  constructor(
    protected override dialogRef: MatDialogRef<TransactionDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: TransactionDto,
    override service: TransactionService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }

  
 
}
