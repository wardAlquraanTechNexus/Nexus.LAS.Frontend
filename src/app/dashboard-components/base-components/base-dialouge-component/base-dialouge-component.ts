import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-base-dialouge-component',
  standalone: false,
  templateUrl: './base-dialouge-component.html',
  styleUrl: './base-dialouge-component.scss'
})
export class BaseDialougeComponent implements OnInit {
  
  element:any;
  constructor(protected dialogRef: MatDialogRef<BaseDialougeComponent>, @Inject(MAT_DIALOG_DATA) public data:any ){
    this.element = data
  }
  ngOnInit(): void {
    
  }


}
