import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-snackbar',
imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],  
templateUrl: './success-snackbar.html',
  styleUrl: './success-snackbar.scss'
})
export class SuccessSnackbar {

    successMsg:any;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string){
    this.successMsg = data;
  }
    snackBarRef = inject(MatSnackBarRef);

}
