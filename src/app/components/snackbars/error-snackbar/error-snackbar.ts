import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-error-snackbar',
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],

  standalone: true,
  templateUrl: './error-snackbar.html',
  styleUrl: './error-snackbar.scss'
})
export class ErrorSnackbar {
  errorMsg:any;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public error: string){
    this.errorMsg = error;
  }
    snackBarRef = inject(MatSnackBarRef);

}
