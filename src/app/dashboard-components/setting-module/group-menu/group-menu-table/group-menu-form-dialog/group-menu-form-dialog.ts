import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { GroupMenuService } from '../../../../../services/group-menu-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-group-form-dialog',
  standalone: false,
  templateUrl: './group-menu-form-dialog.html',
  styleUrl: './group-menu-form-dialog.scss'
})
export class GroupMenuFormDialog extends BaseDialogComponent {
  showLoading = false;
  constructor(
    protected override dialogRef: MatDialogRef<GroupMenuFormDialog>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private service: GroupMenuService,
    protected cdr: ChangeDetectorRef,
  ) {
    super(dialogRef, data)
  }

  onSave(element: any) {
    if (!element.element.id) {
      this.showLoading = true;
      this.service.create(element.element).subscribe({
        next: (res => {
          this.showLoading = false;
          element.element.id = res;
          this.dialogRef.close(element.element);
          this.cdr.markForCheck();
        }), error: (err => {
          this.showLoading = false;
          this.cdr.markForCheck();
        })
      })
    } else {
      this.showLoading = true;
      this.service.update(element.element).subscribe({
        next: (res => {
          this.showLoading = false;
          this.dialogRef.close(element.element);
          this.cdr.markForCheck();
        }), error: (err => {
          this.showLoading = false;
          this.cdr.markForCheck();
        })
      })
    }
  }
  onCancel(event: any) {
    this.dialogRef.close();
  }
}
