import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonOtherDocumentService } from '../../../../services/person-services/person-other-document-service';
import { PersonOtherDocument } from '../../../../models/person-other-document/person-other-document';

@Component({
  selector: 'app-person-other-document-form',
  standalone: false,
  templateUrl: './person-other-document-form.html',
  styleUrl: './person-other-document-form.scss'
})
export class PersonOtherDocumentForm implements OnInit {
  isDragging = false;
  selectedFile: File | null = null;
  formGroup!: FormGroup;
  isLoading = false;

  @Input() personsIdn!: number;
  @Output() saveEmitter = new EventEmitter<PersonOtherDocument>();

  constructor(
    private service: PersonOtherDocumentService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      documentType: [null, Validators.required],
      documentDescription: [null, Validators.required],
      file: [null, Validators.required]
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.validateFile(file)) {
        this.selectedFile = file;
        this.formGroup.get('file')?.setValue(file);
      }
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (this.validateFile(file)) {
        this.selectedFile = file;
        this.formGroup.get('file')?.setValue(file);
      }
    }
  }

  validateFile(file: File): boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf'];
    const maxSize = 3 * 1024 * 1024; // 3MB
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  }


  update() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }


    const formData = new FormData();
    formData.append('documentDescription', this.formGroup.get('documentDescription')?.value);
    formData.append('documentType', this.formGroup.get('documentType')?.value);
    formData.append('personsIdn', this.personsIdn.toString());
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    this.isLoading = true;
    this.service.careateByForm(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        let personOtherDocument: PersonOtherDocument = this.formGroup.value;
        personOtherDocument.personIdn = this.personsIdn;
        personOtherDocument.id = res;
        this.saveEmitter.emit(personOtherDocument);
      }, error: (err) => {
        this.isLoading = false;
      }
    }
    )

  }

  
}
