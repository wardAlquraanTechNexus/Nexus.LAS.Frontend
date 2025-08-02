import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { PersonOtherDocumentDTO } from '../../../../models/person-other-document/person-other-document-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonOtherDocumentService } from '../../../../services/person-other-document-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-person-other-document-form',
  standalone: false,
  templateUrl: './edit-person-other-document-form.html',
  styleUrls: ['./edit-person-other-document-form.scss', '../person-other-document-view.scss']
})
export class EditPersonOtherDocumentForm implements OnInit {
  @Input() personOtherDocumentDto!: PersonOtherDocumentDTO;
  @Output() saveEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelEditEmitter: EventEmitter<any> = new EventEmitter<any>();

  formGroup!: FormGroup;

  constructor(
    private service: PersonOtherDocumentService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    protected snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,


  ) {
  }
  ngOnInit(): void {
    
    this.formGroup = this.fb.group({
      documentType: [this.personOtherDocumentDto?.documentType, Validators.required],
      documentDescription: [this.personOtherDocumentDto?.documentDescription, Validators.required],
    });
  }

  cancelEdit() {
    this.cancelEditEmitter.emit();
  }
  download() {
    if (this.personOtherDocumentDto.dataFile && this.personOtherDocumentDto.contentType && this.personOtherDocumentDto.fileName) {
      const blob = this.base64ToBlob(this.personOtherDocumentDto.dataFile, this.personOtherDocumentDto.contentType);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = this.personOtherDocumentDto.fileName;
      a.click();

      // Optional cleanup
      window.URL.revokeObjectURL(url);
    } else {
      this.snackBar.open('No file available to download.', 'Close', { duration: 3000 });
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

  uploadedFile: File | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.uploadedFile = input.files[0];
      const file = this.uploadedFile;

      this.personOtherDocumentDto.contentType = file.type;
      this.formGroup.get('file')?.setValue(file);

      if (file.type === 'application/pdf') {
        const blobUrl = URL.createObjectURL(file);
        this.personOtherDocumentDto.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      } else if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.personOtherDocumentDto.imageUrl = reader.result as string;
          this.cdr.markForCheck();
        };
        reader.readAsDataURL(file);
      }

      this.cdr.markForCheck();
    }
  }

  save() {

    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {

      Object.keys(this.formGroup.controls).forEach(key => {
        const control = this.formGroup.get(key);
        if (control !== null) {
          (this.personOtherDocumentDto as any)[key] = control.value;
        }
      });

      const formData = new FormData();

      formData.append('id', this.personOtherDocumentDto.id.toString());
      formData.append('documentType', this.formGroup.get('documentType')?.value);
      formData.append('documentDescription', this.formGroup.get('documentDescription')?.value);
      formData.append('personsIdn', this.personOtherDocumentDto.personsIdn.toString());


      if (this.uploadedFile) {
        formData.append('file', this.uploadedFile!, this.uploadedFile!.name);
      }

      this.saveEmitter.emit({ element: this.personOtherDocumentDto, formData: formData });

    }
  }


}
