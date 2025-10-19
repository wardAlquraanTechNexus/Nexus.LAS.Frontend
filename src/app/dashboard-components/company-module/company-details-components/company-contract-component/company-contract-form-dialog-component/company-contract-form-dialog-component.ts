import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyContract } from '../../../../../models/company-models/company-contract/company-contract';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyContractDto } from '../../../../../models/company-models/company-contract/dtos/company-contract-dto';
import { CompanyContractService } from '../../../../../services/company-services/company-contract-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-contract-form-dialog-component',
  standalone: false,
  templateUrl: './company-contract-form-dialog-component.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss']
})
export class CompanyContractFormDialogComponent extends BaseDialogFormComponent<CompanyContract> {

  constructor(
    override dialogRef: MatDialogRef<CompanyContractFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyContractDto,
    override service: CompanyContractService,
    override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }

  override ngOnInit(): void {
    this.data.file = null;
  }


  override onSave(element: any) {
    if (!element.element.id) {
      this.showLoading = true;
      this.service.careateByForm(element.formData).subscribe({
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
