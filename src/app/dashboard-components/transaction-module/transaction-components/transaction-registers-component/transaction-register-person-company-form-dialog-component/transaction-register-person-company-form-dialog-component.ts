import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionRegisterDto } from '../../../../../models/transaction-models/transaction-register/dtos/transaction-register-dto';
import { TransactionRegister } from '../../../../../models/transaction-models/transaction-register/transaction-register';
import { LanguageService } from '../../../../../services/language-service';
import { TransactionRegisterService } from '../../../../../services/transaction-services/transaction-register-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { TransactionRegisterDialogFormComponent } from '../transaction-register-dialog-form-component/transaction-register-dialog-form-component';

@Component({
  selector: 'app-transaction-register-person-company-form-dialog-component',
  standalone: false,
  templateUrl: './transaction-register-person-company-form-dialog-component.html',
  styleUrls: ['./transaction-register-person-company-form-dialog-component.scss']
})
export class TransactionRegisterPersonCompanyFormDialogComponent extends BaseDialogFormComponent<TransactionRegister> {

  constructor(
    override dialogRef: MatDialogRef<TransactionRegisterPersonCompanyFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: TransactionRegisterDto,
    override service: TransactionRegisterService,
    override cdr: ChangeDetectorRef,
    override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }


  override onSave(element: any): void {
    this.showLoading = true;
    this.service.createPC(element.element).subscribe({
      next: (res => {
        this.showLoading = false;
        element.element.id = res;
        this.dialogRef.close(element.element);
        this.cdr.markForCheck();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }


}
