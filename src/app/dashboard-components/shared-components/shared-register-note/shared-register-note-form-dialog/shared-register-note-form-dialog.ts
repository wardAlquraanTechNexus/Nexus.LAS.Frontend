import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../base-components/base-dialog-component/base-dialog-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegisterNoteService } from '../../../../services/register-note-service';

@Component({
  selector: 'app-shared-register-note-form-dialog',
  standalone: false,
  templateUrl: './shared-register-note-form-dialog.html',
  styleUrl: './shared-register-note-form-dialog.scss'
})
export class SharedRegisterNoteFormDialog extends BaseDialogComponent {


  showLoading = false;
  constructor(protected override dialogRef: MatDialogRef<SharedRegisterNoteFormDialog>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private cdr: ChangeDetectorRef,
    private service: RegisterNoteService) {
    super(dialogRef, data)
  }


  onSave(object: any) {
    this.showLoading = true;
    if (!object.element?.id) {
      this.service.createRegisterNote(object.element).subscribe({
        next: (res) => {
          this.dialogRef.close(object.element);
          this.showLoading = false;
        },
        error: (err) => {
          this.showLoading = false;
          this.cdr.markForCheck();
        }
      });
    } else {
      this.service.updateRegisterNote(object.element).subscribe({
        next: (res) => {
          this.dialogRef.close();
          this.showLoading = false;
        },
        error: (err) => {
          this.showLoading = false;
          this.cdr.markForCheck();
        }
      });
    }
  }


  onCancel() {
    this.dialogRef.close();
  }


}
