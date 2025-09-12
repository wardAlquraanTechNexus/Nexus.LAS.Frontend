import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { PersonOtherDocument } from '../../../../../models/person-models/person-other-document/person-other-document';
import { PersonOtherDocumentService } from '../../../../../services/person-services/person-other-document-service';
import { PersonOtherDocumentDTO } from '../../../../../models/person-models/person-other-document/person-other-document-dto';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-person-other-document-dialog-form-component',
  standalone:false,
  templateUrl: './person-other-document-dialog-form-component.html',
  styleUrl: './person-other-document-dialog-form-component.scss'
})
export class PersonOtherDocumentDialogFormComponent extends BaseDialogFormComponent<PersonOtherDocument> {
  constructor(
    override dialogRef: MatDialogRef<PersonOtherDocumentDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: PersonOtherDocumentDTO,
    override service: PersonOtherDocumentService,
    override cdr: ChangeDetectorRef,
  ) {
    super(dialogRef, data, service, cdr)
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
      this.service.updateByDto(element.formData).subscribe({
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
