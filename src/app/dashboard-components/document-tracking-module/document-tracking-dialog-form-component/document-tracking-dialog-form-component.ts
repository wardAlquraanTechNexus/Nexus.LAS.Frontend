import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { DocumentTracking } from '../../../models/document-tracking-models/document-tracking/document-tracking';
import { DocumentTrackingDto } from '../../../models/document-tracking-models/document-tracking/dtos/document-tracking-dto';
import { BaseDialogFormComponent } from '../../base-components/base-dialog-form-component/base-dialog-form-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentTrackingService } from '../../../services/document-tracking-services/document-tracking-service';
import { LanguageService } from '../../../services/language-service';

@Component({
  selector: 'app-document-tracking-dialog-form-component',
  standalone: false,
  templateUrl: './document-tracking-dialog-form-component.html',
  styleUrls: ['../../_shared/styles/common-dialog-form-style.scss'],
})
export class DocumentTrackingDialogFormComponent extends BaseDialogFormComponent<DocumentTracking> {

  constructor(
    protected override dialogRef: MatDialogRef<DocumentTrackingDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: DocumentTrackingDto,
    override service: DocumentTrackingService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService);
  }

  
 
}
