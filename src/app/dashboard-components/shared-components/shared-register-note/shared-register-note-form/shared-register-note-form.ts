import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { BaseDialogComponent } from '../../../base-components/base-dialog-component/base-dialog-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegisterNoteService } from '../../../../services/register-note-service';
import { RegisterNote } from '../../../../models/register-note/register-note';
import { BaseFormComponent } from '../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { DATE_FORMAT_PROVIDERS } from '../../../../shared/date-format.config';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-shared-register-note-form',
  standalone: false,
  templateUrl: './shared-register-note-form.html',
  styleUrl: './shared-register-note-form.scss',
  providers: [
    ...DATE_FORMAT_PROVIDERS
  ]
})
export class SharedRegisterNoteForm extends BaseFormComponent {

  @Input() registerNote!: RegisterNote;
  showLoading = false;
  constructor(
    private service: RegisterNoteService,
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    protected override langService: LanguageService,
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.registerNote);
    super.ngOnInit();
  }


 

}
