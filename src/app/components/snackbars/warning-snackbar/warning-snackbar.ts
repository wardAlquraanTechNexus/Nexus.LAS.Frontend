import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-warning-snackbar',
  imports: [MatButtonModule, MatIconModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  standalone: true,
  templateUrl: './warning-snackbar.html',
  styleUrl: './warning-snackbar.scss'
})
export class WarningSnackbar {

  warningMsg: any;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
    this.warningMsg = data;
  }
  snackBarRef = inject(MatSnackBarRef);

}
