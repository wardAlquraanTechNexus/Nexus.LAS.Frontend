import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyLicenseDto } from '../../../../../models/company-models/company-license/dtos/company-license-dto';
import { CompanyLicenseService } from '../../../../../services/company-services/company-license-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyLicense } from '../../../../../models/company-models/company-license/company-license';

@Component({
  selector: 'app-company-license-form-dialog-component',
  standalone:false,
  templateUrl: './company-license-form-dialog-component.html',
  styleUrl: './company-license-form-dialog-component.scss'
})
export class CompanyLicenseFormDialogComponent  extends BaseDialogFormComponent<CompanyLicense> {
  constructor(
    override dialogRef: MatDialogRef<CompanyLicenseFormDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public override data: CompanyLicenseDto,
    override service:CompanyLicenseService,
    override cdr: ChangeDetectorRef,
  ) {
    super(dialogRef, data , service , cdr)
  }


}
