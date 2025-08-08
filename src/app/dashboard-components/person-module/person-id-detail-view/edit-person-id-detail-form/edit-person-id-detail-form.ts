import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonIdDetailDto } from '../../../../models/person-id-details/person-id-details-dto';
import { PersonIdDetailService } from '../../../../services/person-id-detail-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbar } from '../../../../components/snackbars/success-snackbar/success-snackbar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseFormComponent } from '../../../base-components/base-form-component/base-form-component';

@Component({
  selector: 'app-edit-person-id-detail-form',
  standalone: false,
  templateUrl: './edit-person-id-detail-form.html',
  styleUrl: './edit-person-id-detail-form.scss'
})
export class EditPersonIdDetailForm extends BaseFormComponent {
  @Input() personIdDetail!: PersonIdDetailDto;



  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override snackBar: MatSnackBar,

  ) {
    super(fb, cdr, snackBar, sanitizer);
  }
  override ngOnInit(): void {
    this.setup(this.personIdDetail);
    super.ngOnInit();
  }




  getPrimaryStyle() {
    if (this.personIdDetail.isPrimary) {
      return {
        'border': `2px solid #025EBA`,
        'color': '#025EBA',
        'border-radius': '20px',
        'padding': '10px'

      };
    }
    return {}
  }
}
