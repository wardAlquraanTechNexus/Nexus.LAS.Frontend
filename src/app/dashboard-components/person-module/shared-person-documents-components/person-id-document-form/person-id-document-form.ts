import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonIdDetailService } from '../../../../services/person-services/person-id-detail-service';
import { PersonsIDDetail } from '../../../../models/person-models/person-id-details/person-id-details';

@Component({
  selector: 'app-person-id-document-form',
  standalone: false,
  templateUrl: './person-id-document-form.html',
  styleUrl: './person-id-document-form.scss'
})
export class PersonIdDocumentForm implements OnInit {
  formGroup!: FormGroup;
  isDragging = false;
  selectedFile: File | null = null;
  isLoading = false;

  
  @Input() personsIdn!: number;
  @Output() saveEmitter = new EventEmitter<PersonsIDDetail>;

  constructor(
    private fb: FormBuilder,
    private service: PersonIdDetailService) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      isPrimary: [false],
      type: [null, Validators.required],
      nationality: [null, Validators.required],
      placeOfIssue: [null, Validators.required],
      idNumber: [null, [Validators.required, Validators.minLength(4)]],
      idIssueDate: [null, Validators.required],
      expiryDate: [null],
      activeReminder: [false],
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
    formData.append('isPrimary', this.formGroup.get('isPrimary')?.value);
    formData.append('type', this.formGroup.get('type')?.value);
    formData.append('nationality', this.formGroup.get('nationality')?.value);
    formData.append('placeOfIssue', this.formGroup.get('placeOfIssue')?.value);
    formData.append('idNumber', this.formGroup.get('idNumber')?.value);
    formData.append('idIssueDate', this.formGroup.get('idIssueDate')?.value.toISOString());
    formData.append('expiryDate', this.formGroup.get('expiryDate')?.value ? this.formGroup.get('expiryDate')?.value.toISOString() : '');
    formData.append('activeReminder', this.formGroup.get('activeReminder')?.value);
    formData.append('personsIdn', this.personsIdn.toString());

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    
    this.isLoading = true;
    this.service.careateByForm(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        let personIdDetail:PersonsIDDetail = this.formGroup.value;
        personIdDetail.personsIdn = this.personsIdn;
        personIdDetail.id = res;
        this.saveEmitter.emit(personIdDetail);
      }, error: (err) => {
        this.isLoading = false;
      }
    }
    )
  }
}
