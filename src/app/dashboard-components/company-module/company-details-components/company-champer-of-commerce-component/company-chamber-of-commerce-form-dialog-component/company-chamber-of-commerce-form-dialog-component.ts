import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyChamberOfCommerceDTO } from '../../../../../models/company-models/company-chamber-of-commerce/dtos/company-chamber-of-commerce-dto';
import { CompanyChamberOfCommerceService } from '../../../../../services/company-services/company-chamber-of-commerce-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyChamberOfCommerce } from '../../../../../models/company-models/company-chamber-of-commerce/company-chamber-of-commerce';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-chamber-of-commerce-form-dialog-component',
  standalone: false,
  templateUrl: './company-chamber-of-commerce-form-dialog-component.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss']
})
export class CompanyChamberOfCommerceFormDialogComponent extends BaseDialogFormComponent<CompanyChamberOfCommerce> {

  constructor(
    override dialogRef: MatDialogRef<CompanyChamberOfCommerceFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyChamberOfCommerceDTO,
    override service: CompanyChamberOfCommerceService,
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
