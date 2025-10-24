import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MenuService } from '../../../../../services/menu-service';

@Component({
  selector: 'app-menu-dialog',
  standalone:false,
  templateUrl: './menu-dialog.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss']
})
export class MenuDialog extends BaseDialogComponent {
  showLoading = false;
  constructor(
    protected override dialogRef: MatDialogRef<MenuDialog>, 
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private service:MenuService,
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
