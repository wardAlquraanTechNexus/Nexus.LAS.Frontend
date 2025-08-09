import { Component, Inject } from '@angular/core';
import { BaseDialougeComponent } from '../../../../base-components/base-dialouge-component/base-dialouge-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DynamicListService } from '../../../../../services/dynamic-list-service';

@Component({
  selector: 'app-dynamic-list-dialog',
  standalone: false,
  templateUrl: './dynamic-list-dialog.html',
  styleUrl: './dynamic-list-dialog.scss'
})
export class DynamicListDialog extends BaseDialougeComponent {
  showLoading = false;
  constructor(
    protected override dialogRef: MatDialogRef<DynamicListDialog>, 
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private dlService:DynamicListService) {
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
        }),error:(err=>{
          this.showLoading = false;
        })
      })
    }else{
      this.showLoading = true;
      this.dlService.update(element.element).subscribe({
        next:(res=>{
          this.showLoading = false;
          this.dialogRef.close(element.element);
        }),error:(err=>{
          this.showLoading = false;
        })
      })
    }
  }
  onCancel(event: any) {
    this.dialogRef.close();
  }
}
