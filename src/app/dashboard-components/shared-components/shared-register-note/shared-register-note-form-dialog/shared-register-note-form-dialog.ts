import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../base-components/base-dialog-component/base-dialog-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegisterNoteService } from '../../../../services/register-note-service';
import { BaseDialogFormComponent } from '../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { RegisterNote } from '../../../../models/register-note/register-note';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-shared-register-note-form-dialog',
  standalone: false,
  templateUrl: './shared-register-note-form-dialog.html',
  styleUrls: ['../../../_shared/styles/common-dialog-form-style.scss']
})
export class SharedRegisterNoteFormDialog extends BaseDialogFormComponent<RegisterNote> {


  constructor(protected override dialogRef: MatDialogRef<SharedRegisterNoteFormDialog>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
    override cdr: ChangeDetectorRef,
    override service: RegisterNoteService,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }




}
