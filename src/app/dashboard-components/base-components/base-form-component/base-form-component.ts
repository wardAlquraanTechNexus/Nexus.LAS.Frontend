import { ChangeDetectorRef, Component, EventEmitter, Inject, Injectable, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { FileDto } from '../../../models/base/file-dto';
import { BaseEntity, FormData } from '../../../models/base/base-entity';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base-form-component',
  standalone: false,
  templateUrl: './base-form-component.html',
  styleUrl: './base-form-component.scss'
})
export class BaseFormComponent<T extends BaseEntity = BaseEntity> implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  uploadedFile: File | null = null;
  @Input() object: T | null = null;
  @Output() saveEmitter: EventEmitter<T> = new EventEmitter<T>();
  @Output() cancelEditEmitter: EventEmitter<void> = new EventEmitter<void>();

  formGroup!: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    protected snackBar: MatSnackBar,
    protected sanitizer: DomSanitizer,
  ) {

  }

  protected setup(object: T): void {
    this.object = object;
  }

  ngOnInit(): void {
    this.initFormGroup();
  }

  initFormGroup(): void {
    if (this.object) {
      const group: { [key: string]: FormControl } = {};

      for (const key of Object.keys(this.object)) {
        group[key] = new FormControl((this.object as any)[key]);
      }
      this.formGroup = this.fb.group(group);
      this.cdr.detectChanges();
    }
  }

  cancelEdit(): void {
    this.cancelEditEmitter.emit();
  }

  download(): void {
    if (this.object && (this.object as any).dataFile && (this.object as any).contentType && (this.object as any).fileName) {
      const blob = this.base64ToBlob((this.object as any).dataFile, (this.object as any).contentType);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = (this.object as any).fileName;
      a.click();

      // Optional cleanup
      window.URL.revokeObjectURL(url);
    } else {
      this.snackBar.open('No file available to download.', 'Close', { duration: 3000 });
    }
  }

  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }


  save(isFormData: boolean = false): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      const formData = new FormData();

      Object.keys(this.formGroup.controls).forEach(key => {
        const control = this.formGroup.get(key);
        if (control !== null) {
          const value = control.value;
          if (this.object) {
            (this.object as any)[key] = value;
          }

          if (value instanceof Date) {
            if(value != null){
              const date = new Date(value);
              const formattedDate = date.toDateString();
              formData.append(key, formattedDate);
            }
          } else {
            if(value != null){
              formData.append(key, value);
            }
          }
        }
      });

      if (isFormData) {
        if (this.uploadedFile) {
          formData.append('file', this.uploadedFile!, this.uploadedFile!.name);
        }
        this.saveEmitter.emit({ element: this.object, formData });
      } else {
        this.saveEmitter.emit({ element: this.object });
      }
    }
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.uploadedFile = input.files[0];
      const file = this.uploadedFile;

      this.object.contentType = file.type;
      this.formGroup.get('file')?.setValue(file);

      if (file.type === 'application/pdf') {
        const blobUrl = URL.createObjectURL(file);
        this.object.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      } else if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.object.imageUrl = reader.result as string;
          this.cdr.markForCheck();
        };
        reader.readAsDataURL(file);
      }

      this.cdr.markForCheck();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
