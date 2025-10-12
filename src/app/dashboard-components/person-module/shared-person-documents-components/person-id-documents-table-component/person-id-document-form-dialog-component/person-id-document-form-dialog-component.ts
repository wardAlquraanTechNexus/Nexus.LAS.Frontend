import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { PersonIdDetailDto } from '../../../../../models/person-models/person-id-details/person-id-details-dto';
import { PersonIdDetailService } from '../../../../../services/person-services/person-id-detail-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonsIDDetail } from '../../../../../models/person-models/person-id-details/person-id-details';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-person-id-document-form-dialog-component',
  standalone:false,
  templateUrl: './person-id-document-form-dialog-component.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss']
})
export class PersonIdDocumentFormDialogComponent extends BaseDialogFormComponent<PersonsIDDetail> {
  constructor(
    override dialogRef: MatDialogRef<PersonIdDocumentFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: PersonIdDetailDto,
    override service: PersonIdDetailService,
    override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
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
