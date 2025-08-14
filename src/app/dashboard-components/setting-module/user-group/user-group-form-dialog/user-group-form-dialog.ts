import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../base-components/base-dialog-component/base-dialog-component';
import { UserGroupService } from '../../../../services/user-group-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-group-form-dialog',
  standalone:false,
  templateUrl: './user-group-form-dialog.html',
  styleUrl: './user-group-form-dialog.scss'
})
export class UserGroupFormDialog extends BaseDialogComponent {
  showLoading = false;
  constructor(
    protected override dialogRef: MatDialogRef<UserGroupFormDialog>, 
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private service:UserGroupService,
    protected cdr: ChangeDetectorRef,
  ) {
    super(dialogRef, data)
  }

  onSave(element: any) {
    if(!element.element.id){
      this.showLoading = true;
      this.service.create(element.element).subscribe({
        next:(res=>{
          this.showLoading = false;
          element.element.id = res;
          this.dialogRef.close(element.element);
          this.cdr.markForCheck();
        }),error:(err=>{
          this.showLoading = false;
          this.cdr.markForCheck();
        })
      })
    }else{
      this.showLoading = true;
      this.service.update(element.element).subscribe({
        next:(res=>{
          this.showLoading = false;
          this.dialogRef.close(element.element);
          this.cdr.markForCheck();
        }),error:(err=>{
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
