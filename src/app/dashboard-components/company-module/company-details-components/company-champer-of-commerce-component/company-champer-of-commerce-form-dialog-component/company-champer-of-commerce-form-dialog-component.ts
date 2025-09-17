import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyChamberOfCommerceDTO } from '../../../../../models/company-models/company-champer-of-commerce/dtos/company-champer-of-commerce-dto';
import { CompanyChamperOfCommerceService } from '../../../../../services/company-services/company-champer-of-commerce-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyChamberOfCommerce } from '../../../../../models/company-models/company-champer-of-commerce/company-champer-of-commerce';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-champer-of-commerce-form-dialog-component',
  standalone: false,
  templateUrl: './company-champer-of-commerce-form-dialog-component.html',
  styleUrl: './company-champer-of-commerce-form-dialog-component.scss'
})
export class CompanyChamperOfCommerceFormDialogComponent extends BaseDialogFormComponent<CompanyChamberOfCommerce> {

  constructor(
    override dialogRef: MatDialogRef<CompanyChamperOfCommerceFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyChamberOfCommerceDTO,
    override service: CompanyChamperOfCommerceService,
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
