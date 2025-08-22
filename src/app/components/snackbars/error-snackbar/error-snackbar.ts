import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-error-snackbar',
  imports: [MatButtonModule, MatIconModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],

  standalone: true,
  templateUrl: './error-snackbar.html',
  styleUrl: './error-snackbar.scss'
})
export class ErrorSnackbar {
  errorMsg: any;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
    this.errorMsg = data;
  }
  snackBarRef = inject(MatSnackBarRef);

}
