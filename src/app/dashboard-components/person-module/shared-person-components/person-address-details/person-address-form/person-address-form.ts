import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { PersonAddress } from '../../../../../models/person-address/person-address';
import { PersonAddressService } from '../../../../../services/person-address-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-person-address-form',
  standalone: false,
  templateUrl: './person-address-form.html',
  styleUrl: './person-address-form.scss'
})
export class PersonAddressForm  extends BaseFormComponent {
  @Input() personAddress?: PersonAddress;
  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override snackBar: MatSnackBar,
    protected override sanitizer: DomSanitizer,
  ) {
    super(fb, cdr, snackBar, sanitizer);
  }

  override ngOnInit(): void {
    if (this.personAddress) {
      this.setup(this.personAddress);
    }
    super.ngOnInit();
  }

}
