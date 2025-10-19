import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { PropertyDocument } from '../../../../../models/property-models/property-document/property-document';
import { PropertyDocumentDTO } from '../../../../../models/property-models/property-document/dtos/property-document-dto';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { PropertyDocumentService } from '../../../../../services/property-services/property-document-service';
import { LanguageService } from '../../../../../services/language-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-property-document-dialog-form-component',
  standalone: false,
  templateUrl: './property-document-dialog-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss']
})
export class PropertyDocumentDialogFormComponent extends BaseDialogFormComponent<PropertyDocument> {
  constructor(
    override dialogRef: MatDialogRef<PropertyDocumentDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: PropertyDocumentDTO,
    override service: PropertyDocumentService,
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
