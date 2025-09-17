import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LanguageService } from '../../services/language-service';
import { LanguageCode } from '../../models/types/lang-type';
import { Labels } from '../../models/consts/labels';

@Component({
  selector: 'app-confirm-delete-component',
  standalone: false,
  templateUrl: './confirm-delete-component.html',
  styleUrls: ['./confirm-delete-component.scss']

})
export class ConfirmDeleteComponent {
  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private langService: LanguageService
  ) {
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }
  
    onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
