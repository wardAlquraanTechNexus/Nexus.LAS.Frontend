import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-component',
  standalone: false,
  templateUrl: './confirm-delete-component.html',
  styleUrls: ['./confirm-delete-component.scss']

})
export class ConfirmDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any 
  ) {}
  
    onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
