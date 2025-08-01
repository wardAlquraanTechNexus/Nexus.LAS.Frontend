import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonIdDetailDto } from '../../../../models/person-id-details/person-id-details-dto';
import { PersonIdDetailService } from '../../../../services/person-id-detail-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbar } from '../../../../components/snackbars/success-snackbar/success-snackbar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit-person-id-detail-form',
  standalone: false,
  templateUrl: './edit-person-id-detail-form.html',
  styleUrl: './edit-person-id-detail-form.scss'
})
export class EditPersonIdDetailForm implements OnInit {
  @Input() personIdDetail!: PersonIdDetailDto;
  @Output() saveEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelEditEmitter: EventEmitter<any> = new EventEmitter<any>();

  formGroup!: FormGroup;
  showLoading = false;


  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    protected snackBar: MatSnackBar,

  ) {

  }
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      isPrimary: [this.personIdDetail?.isPrimary],
      type: [this.personIdDetail?.type, Validators.required],
      nationality: [this.personIdDetail?.nationality, Validators.required],
      placeOfIssue: [this.personIdDetail?.placeOfIssue, Validators.required],
      idNumber: [this.personIdDetail?.idNumber, [Validators.required, Validators.minLength(4)]],
      idIssueDate: [this.personIdDetail?.idIssueDate, Validators.required],
      expiryDate: [this.personIdDetail?.expiryDate],
      activeReminder: [this.personIdDetail?.activeReminder],
    });
    if (this.personIdDetail.dataFile) {
      const base64Data = this.personIdDetail?.dataFile;
      const blob = this.base64ToBlob(base64Data, this.personIdDetail.contentType);
      const url = URL.createObjectURL(blob);
      this.personIdDetail.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  save() {
    
    this.formGroup.markAllAsTouched();
   if (this.formGroup.valid) {

    Object.keys(this.formGroup.controls).forEach(key => {
      const control = this.formGroup.get(key);
      if (control !== null) {
        (this.personIdDetail as any)[key] = control.value;
      }
    });
      const formData = new FormData();
      const issueDateValue = this.formGroup.get('idIssueDate')?.value;
      if (issueDateValue) {
        formData.append('idIssueDate', issueDateValue);
      }
      const expiryDate = this.formGroup.get('expiryDate')?.value;
      if (expiryDate) {
        formData.append('idIssueDate', expiryDate);
      }
      formData.append('id', this.personIdDetail.id.toString());
      formData.append('isPrimary', this.formGroup.get('isPrimary')?.value);
      formData.append('type', this.formGroup.get('type')?.value);
      formData.append('nationality', this.formGroup.get('nationality')?.value);
      formData.append('placeOfIssue', this.formGroup.get('placeOfIssue')?.value);
      formData.append('idNumber', this.formGroup.get('idNumber')?.value);
      formData.append('activeReminder', this.formGroup.get('activeReminder')?.value);
      formData.append('personsIdn', this.personIdDetail.personsIdn.toString());

      if (this.uploadedFile) {
        formData.append('file', this.uploadedFile!, this.uploadedFile!.name);
      }
      
      this.saveEmitter.emit({element: this.personIdDetail , formData:formData});

  }
  }
  cancelEdit() {
    this.cancelEditEmitter.emit();
  }

  download() {
    if (this.personIdDetail.dataFile && this.personIdDetail.contentType && this.personIdDetail.fileName) {
      const blob = this.base64ToBlob(this.personIdDetail.dataFile, this.personIdDetail.contentType);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = this.personIdDetail.fileName;
      a.click();

      // Optional cleanup
      window.URL.revokeObjectURL(url);
    } else {
      this.snackBar.open('No file available to download.', 'Close', { duration: 3000 });
    }
  }

  uploadedFile: File | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.uploadedFile = input.files[0];
      const file = this.uploadedFile;

      this.personIdDetail.contentType = file.type;
      this.formGroup.get('file')?.setValue(file);

      if (file.type === 'application/pdf') {
        const blobUrl = URL.createObjectURL(file);
        this.personIdDetail.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      } else if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.personIdDetail.imageUrl = reader.result as string;
          this.cdr.markForCheck();
        };
        reader.readAsDataURL(file);
      }

      this.cdr.markForCheck();
    }
  }




  base64ToBlob(base64: any, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }
  getPrimaryStyle() {
    if (this.personIdDetail.isPrimary) {
      return {
        'border': `2px solid #025EBA`,
        'color': '#025EBA',
        'border-radius': '20px',
        'padding': '10px'

      };
    }
    return {}
  }
}
