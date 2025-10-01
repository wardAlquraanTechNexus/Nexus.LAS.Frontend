import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Transaction } from '../../../../../models/transaction-models/transaction/transaction';
import { TransactionDto } from '../../../../../models/transaction-models/transaction/dtos/transaction-dto';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../../../services/language-service';
import { TransactionRegisterService } from '../../../../../services/transaction-services/transaction-register-service';
import { TransactionRegister } from '../../../../../models/transaction-models/transaction-register/transaction-register';
import { TransactionRegisterDto } from '../../../../../models/transaction-models/transaction-register/dtos/transaction-register-dto';

@Component({
  selector: 'app-transaction-register-dialog-form-component',
  standalone: false,
  templateUrl: './transaction-register-dialog-form-component.html',
  styleUrls: ['./transaction-register-dialog-form-component.scss']
})
export class TransactionRegisterDialogFormComponent extends BaseDialogFormComponent<TransactionRegister> {

  constructor(
    override dialogRef: MatDialogRef<TransactionRegisterDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: TransactionRegisterDto,
    override service: TransactionRegisterService,
    override cdr: ChangeDetectorRef,
    override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }

  
 
}
