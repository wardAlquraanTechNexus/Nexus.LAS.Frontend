import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { BaseDialogComponent } from '../../../base-components/base-dialog-component/base-dialog-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegisterNoteService } from '../../../../services/register-note-service';
import { RegisterNote } from '../../../../models/register-note/register-note';
import { BaseFormComponent } from '../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DATE_FORMAT_PROVIDERS } from '../../../../shared/date-format.config';

@Component({
  selector: 'app-shared-register-note-form',
  standalone: false,
  templateUrl: './shared-register-note-form.html',
  styleUrl: './shared-register-note-form.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    ...DATE_FORMAT_PROVIDERS,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
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
  ) {
    super(fb, cdr, sanitizer, errorHandler);
  }

  override ngOnInit(): void {
    this.setup(this.registerNote);
    super.ngOnInit();
  }


 

}
