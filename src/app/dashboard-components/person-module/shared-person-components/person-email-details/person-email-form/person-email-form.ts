import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PersonEmail } from '../../../../../models/person-email/person-email';

@Component({
  selector: 'app-person-email-form',
  standalone: false,
  templateUrl: './person-email-form.html',
  styleUrl: './person-email-form.scss'
})
export class PersonEmailForm extends BaseFormComponent {
  @Input() personEmail?: PersonEmail;
  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
  ) {
    super(fb, cdr, sanitizer);
  }

  override ngOnInit(): void {
    if (this.personEmail) {
      this.setup(this.personEmail);
    }
    super.ngOnInit();
  }
}
