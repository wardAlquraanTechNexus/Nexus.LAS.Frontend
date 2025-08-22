import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-info-snackbar',
  imports: [MatButtonModule, MatIconModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  standalone: true,
  templateUrl: './info-snackbar.html',
  styleUrl: './info-snackbar.scss'
})
export class InfoSnackbar {

  infoMsg: any;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
    this.infoMsg = data;
  }
  snackBarRef = inject(MatSnackBarRef);

}
