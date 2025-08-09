import { Component, Inject } from '@angular/core';
import { BaseDialougeComponent } from '../../../../base-components/base-dialouge-component/base-dialouge-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dynamic-list-dialog',
  standalone: false,
  templateUrl: './dynamic-list-dialog.html',
  styleUrl: './dynamic-list-dialog.scss'
})
export class DynamicListDialog extends BaseDialougeComponent {
  constructor(protected override dialogRef: MatDialogRef<DynamicListDialog>, @Inject(MAT_DIALOG_DATA) public override data: any) {
    super(dialogRef , data)
  }

  onSave(element:any){
    console.log(element);
  }
  onCancel(event:any){
    this.dialogRef.close();
  }
}
