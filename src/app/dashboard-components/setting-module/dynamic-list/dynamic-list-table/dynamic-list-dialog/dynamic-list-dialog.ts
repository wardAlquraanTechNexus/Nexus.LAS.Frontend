import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicListService } from '../../../../../services/dynamic-list-service';

@Component({
  selector: 'app-dynamic-list-dialog',
  standalone: false,
  templateUrl: './dynamic-list-dialog.html',
  styleUrl: './dynamic-list-dialog.scss'
})
export class DynamicListDialog extends BaseDialogComponent {
  showLoading = false;
  constructor(
    protected override dialogRef: MatDialogRef<DynamicListDialog>, 
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private dlService:DynamicListService,
    protected cdr: ChangeDetectorRef,
  ) {
    super(dialogRef, data)
  }

  onSave(element: any) {
    if(!element.element.id){
      this.showLoading = true;
      this.dlService.create(element.element).subscribe({
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
      this.dlService.update(element.element).subscribe({
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
