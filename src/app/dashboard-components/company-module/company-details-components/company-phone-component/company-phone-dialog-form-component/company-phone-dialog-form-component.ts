import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyPhone } from '../../../../../models/company-models/company-phone/company-phone';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyPhoneService } from '../../../../../services/company-services/company-phone-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompanyPhoneDto } from '../../../../../models/company-models/company-phone/dtos/company-phone-dto';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-phone-dialog-form-component',
    standalone:false,

  templateUrl: './company-phone-dialog-form-component.html',
  styleUrl: './company-phone-dialog-form-component.scss'
})
export class CompanyPhoneDialogFormComponent
  extends BaseDialogFormComponent<CompanyPhone> {

  constructor(
    protected override dialogRef: MatDialogRef<CompanyPhoneDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyPhoneDto,
    override service: CompanyPhoneService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }
}
