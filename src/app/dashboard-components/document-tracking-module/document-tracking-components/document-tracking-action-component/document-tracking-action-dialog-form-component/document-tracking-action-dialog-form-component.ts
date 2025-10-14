import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentTrackingAction } from '../../../../../models/document-tracking-models/document-tracking-action/document-tracking-action';
import { DocumentTrackingActionService } from '../../../../../services/document-tracking-services/document-tracking-action-service';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-document-tracking-action-dialog-form-component',
  standalone: false,
  templateUrl: './document-tracking-action-dialog-form-component.html',
  styleUrls: ['./document-tracking-action-dialog-form-component.scss']
})
export class DocumentTrackingActionDialogFormComponent extends BaseDialogFormComponent<DocumentTrackingAction> {

  constructor(
    protected override dialogRef: MatDialogRef<DocumentTrackingActionDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: DocumentTrackingAction,
    override service: DocumentTrackingActionService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }

  
 
}
