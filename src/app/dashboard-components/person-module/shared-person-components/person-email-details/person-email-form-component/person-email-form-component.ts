import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PersonEmail } from '../../../../../models/person-models/person-email/person-email';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-person-email-form-component',
  standalone: false,
  templateUrl: './person-email-form-component.html',
  styleUrl: './person-email-form-component.scss'
})
export class PersonEmailFormComponent extends BaseFormComponent {
  @Input() personEmail?: PersonEmail;
  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    protected override langService: LanguageService
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService );
  }

  override ngOnInit(): void {
    if (this.personEmail) {
      this.setup(this.personEmail);
    }
    super.ngOnInit();
  }
  
}
