import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-base-dialog-component',
  standalone: false,
  templateUrl: './base-dialog-component.html',
  styleUrl: './base-dialog-component.scss'
})
export class BaseDialogComponent implements OnInit {
  element: any;
  constructor(
  protected dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.element = data;
  }
  ngOnInit(): void {}
}
