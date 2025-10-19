import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyLicenseDto } from '../../../../../models/company-models/company-license/dtos/company-license-dto';
import { CompanyLicenseService } from '../../../../../services/company-services/company-license-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyLicense } from '../../../../../models/company-models/company-license/company-license';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-license-form-dialog-component',
  standalone: false,
  templateUrl: './company-license-form-dialog-component.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss']

})
export class CompanyLicenseFormDialogComponent extends BaseDialogFormComponent<CompanyLicense> {
  constructor(
    override dialogRef: MatDialogRef<CompanyLicenseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyLicenseDto,
    override service: CompanyLicenseService,
    override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }

  override onSave(element: any) {
    if (!element.element.id) {
      this.showLoading = true;
      this.service.createByForm(element.formData).subscribe({
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
    } else {
      this.showLoading = true;
      this.service.updateByForm(element.formData).subscribe({
        next: (res => {
          this.showLoading = false;
          this.dialogRef.close(element.element);
          this.cdr.markForCheck();
        }), error: (err => {
          this.showLoading = false;
          this.cdr.markForCheck();
        })
      })
    }
  }
}
