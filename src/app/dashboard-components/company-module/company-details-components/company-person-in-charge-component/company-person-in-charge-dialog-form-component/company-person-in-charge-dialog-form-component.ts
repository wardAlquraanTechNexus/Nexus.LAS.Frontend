import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyPersonInChargeDto } from '../../../../../models/company-models/company-person-in-charge/get-company-person-in-charge/get-company-person-in-charge-dto';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyPersonInChargeService } from '../../../../../services/company-services/company-person-in-charge-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyPersonInCharge } from '../../../../../models/company-models/company-person-in-charge/company-person-in-charge';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-person-in-charge-dialog-form-component',
  standalone:false,
  templateUrl: './company-person-in-charge-dialog-form-component.html',
  styleUrl: './company-person-in-charge-dialog-form-component.scss'
})
export class CompanyPersonInChargeDialogFormComponent  extends BaseDialogFormComponent<CompanyPersonInCharge> {
  constructor(
    protected override dialogRef: MatDialogRef<CompanyPersonInChargeDialogFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public override data: CompanyPersonInChargeDto,
    override service:CompanyPersonInChargeService,
    override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data,service,cdr,langService)
  }

}
