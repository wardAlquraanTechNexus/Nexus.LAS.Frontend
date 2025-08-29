import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseService } from '../../../services/base/base-service';

@Component({
  selector: 'app-base-dialog-form-component',
  standalone: false,
  templateUrl: './base-dialog-form-component.html',
  styleUrl: './base-dialog-form-component.scss'
})
export class BaseDialogFormComponent<T> implements OnInit {

  showLoading = false;
  constructor(
    protected dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: BaseService<T>,
    protected cdr: ChangeDetectorRef,
  ) {

  }
  ngOnInit(): void {
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
