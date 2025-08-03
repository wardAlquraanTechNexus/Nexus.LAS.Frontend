import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PersonPhone } from '../../../../../models/menus/person-phone/person-phone';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

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
    protected override snackBar: MatSnackBar,
    protected override sanitizer: DomSanitizer,
  ) {
    super(fb, cdr, snackBar, sanitizer);
  }

  override ngOnInit(): void {
    this.setup(this.personPhone);
    super.ngOnInit();
  }
}
