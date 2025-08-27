import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyEmail } from '../../../../../models/company-models/company-email/company-email';
import { CompanyEmailDto } from '../../../../../models/company-models/company-email/dtos/company-email-dto';
import { CompanyEmailService } from '../../../../../services/company-services/company-email-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-company-email-dialog-form-component',
  standalone: false,

  templateUrl: './company-email-dialog-form-component.html',
  styleUrl: './company-email-dialog-form-component.scss'
})
export class CompanyEmailDialogFormComponent 
  extends BaseDialogFormComponent<CompanyEmail> {

  constructor(
    protected override dialogRef: MatDialogRef<CompanyEmailDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyEmailDto,
    override service: CompanyEmailService,
    protected override cdr: ChangeDetectorRef,
  ) {
    super(dialogRef, data, service, cdr)
  }
}
