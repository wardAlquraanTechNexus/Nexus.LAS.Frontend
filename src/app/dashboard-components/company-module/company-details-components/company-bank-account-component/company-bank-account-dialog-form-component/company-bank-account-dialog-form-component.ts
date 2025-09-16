import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyBankAccount } from '../../../../../models/company-models/company-bank-account/company-bank-account';
import { CompanyBankAccountDto } from '../../../../../models/company-models/company-bank-account/dtos/company-bank-account-dto';
import { CompanyBankAccountService } from '../../../../../services/company-services/company-bank-account-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-bank-account-dialog-form-component',
  standalone:false,
  templateUrl: './company-bank-account-dialog-form-component.html',
  styleUrl: './company-bank-account-dialog-form-component.scss'
})
export class CompanyBankAccountDialogFormComponent extends BaseDialogFormComponent<CompanyBankAccount> {

  constructor(
    protected override dialogRef: MatDialogRef<CompanyBankAccountDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyBankAccountDto,
    override service: CompanyBankAccountService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }
}
