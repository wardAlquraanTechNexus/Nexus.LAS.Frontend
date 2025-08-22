import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PersonPhone } from '../../../../../models/person-phone/person-phone';

@Component({
  selector: 'app-person-phone-form',
  standalone:false,
  templateUrl: './person-phone-form.html',
  styleUrl: './person-phone-form.scss'
})
export class PersonPhoneForm extends BaseFormComponent {
  @Input() personPhone?: PersonPhone;
  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
  ) {
    super(fb, cdr, sanitizer);
  }

  override ngOnInit(): void {
    if (this.personPhone) {
      this.setup(this.personPhone);
    }
    super.ngOnInit();
  }
}
