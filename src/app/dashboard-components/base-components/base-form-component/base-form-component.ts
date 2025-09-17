import { ChangeDetectorRef, Component, EventEmitter, Inject, Injectable, Input, OnInit, Output, OnDestroy, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileDto } from '../../../models/base/file-dto';
import { BaseEntity } from '../../../models/base/base-entity';
import { Subject } from 'rxjs';
import { ValidationUtils } from '../../../utils/validation-utils';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { LoadingStateService } from '../../../services/loading-state.service';
import { LanguageService } from '../../../services/language-service';
import { LanguageCode } from '../../../models/types/lang-type';
import { Labels } from '../../../models/consts/labels';
import { isDate, format } from 'date-fns';

@Component({
  selector: 'app-base-form-component',
  standalone: false,
  templateUrl: './base-form-component.html',
  styleUrl: './base-form-component.scss'
})
export class BaseFormComponent implements OnInit, OnDestroy {

  isDragging = false;
  private destroy$ = new Subject<void>();
  protected isBrowser: boolean = true;
  uploadedFile: File | null = null;
  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  @Input() object: | null = null;
  @Input() validationRules: { [key: string]: ValidatorFn[] } = {};
  @Output() saveEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() cancelEditEmitter: EventEmitter<void> = new EventEmitter<void>();

  formGroup!: FormGroup;
  validationUtils = ValidationUtils;
  isSubmitting = false;

  protected loadingService!: LoadingStateService;

  constructor(
    protected fb: FormBuilder,
    protected cdr: ChangeDetectorRef,
    protected sanitizer: DomSanitizer,
    protected errorHandler: ErrorHandlerService,
    protected langService: LanguageService,
    loadingService?: LoadingStateService,
    @Inject(PLATFORM_ID) @Optional() protected platformId?: Object
  ) {
    this.isBrowser = !platformId || isPlatformBrowser(platformId);
    this.loadingService = loadingService || new LoadingStateService();
  }

  protected setup(object: any): void {
    this.object = object;
  }

  ngOnInit(): void {
    this.initFormGroup();

    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
      this.cdr.markForCheck();
    });
  }


  initFormGroup(): void {
    if (this.object) {
      const group: { [key: string]: FormControl } = {};

      for (const key of Object.keys(this.object)) {
        const validators = this.validationRules[key] || [];
        let value = (this.object as any)[key];

        group[key] = new FormControl(value, validators);
      }

      this.formGroup = this.fb.group(group);
      console.log(this.formGroup.getRawValue());
      this.cdr.markForCheck();
    }
  }


  /**
   * Get validation error message for a specific field
   */
  getFieldError(fieldName: string): string {
    const control = this.formGroup?.get(fieldName);
    if (!control || !control.touched || !control.errors) return '';

    return ValidationUtils.getErrorMessage(control, this.getFieldDisplayName(fieldName));
  }

  /**
   * Check if a field has validation errors
   */
  hasFieldError(fieldName: string): boolean {
    const control = this.formGroup?.get(fieldName);
    return !!(control && control.invalid && control.touched);
  }

  /**
   * Get display name for field (override in child components)
   */
  protected getFieldDisplayName(fieldName: string): string {
    return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  }

  /**
   * Mark all form fields as touched to show validation errors
   */
  protected markAllFieldsAsTouched(): void {
    if (this.formGroup) {
      Object.keys(this.formGroup.controls).forEach(key => {
        this.formGroup.get(key)?.markAsTouched();
      });
    }
  }

  cancelEdit(): void {
    this.cancelEditEmitter.emit();
  }

  download(): void {
    if (!this.isBrowser) {
      this.errorHandler.showInfo('Download not available in server mode.');
      return;
    }

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
      this.errorHandler.showInfo('No file available to download.');
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
    this.markAllFieldsAsTouched();

    if (!this.formGroup.valid) {
      this.errorHandler.showWarning('Please fix the form errors before submitting.');
      return;
    }

    if (this.isSubmitting) {
      return; // Prevent double submission
    }

    this.isSubmitting = true;
    this.loadingService.startLoading('Saving form');

    try {
      const formData = new FormData();

      Object.keys(this.formGroup.controls).forEach(key => {
        const control = this.formGroup.get(key);
        if (control !== null) {
          let value = control.value;
          if (this.object) {
            (this.object as any)[key] = value;
          }

          // Date values are already Date objects, no conversion needed

          if (value instanceof Date) {
            if (value != null) {
              // Format as yyyy-MM-dd for backend compatibility
              const formattedDate = value.toISOString().split('T')[0];
              formData.append(key, formattedDate);
            }
          } else {
            if (value != null) {
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

    } catch (error) {
      this.errorHandler.handleError('Failed to save form', 'An error occurred while processing the form data.');
    } finally {
      this.isSubmitting = false;
      this.loadingService.stopLoading('Saving form');
      this.cdr.markForCheck();
    }
  }



  /**
   * Handle form save error
   */
  protected onSaveError(error: any, context: string = 'Save operation failed'): void {
    this.isSubmitting = false;
    this.loadingService.stopLoading('Saving form');
    this.errorHandler.handleError(context, error?.message || 'Unknown error occurred');
    this.cdr.markForCheck();
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.uploadedFile = input.files[0];
      const file = this.uploadedFile;

      if (this.object) {
        (this.object as any).contentType = file.type;
      }
      this.formGroup.get('file')?.setValue(file);

      if (file.type === 'application/pdf') {
        const blobUrl = URL.createObjectURL(file);
        if (this.object) {
          (this.object as any).imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
        }
      } else if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          if (this.object) {
            (this.object as any).imageUrl = reader.result as string;
          }
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

  get fileUrl(): string | null {
    const file = this.formGroup.get('file')?.value;
    if (!file) return null;
    return typeof file === 'string' ? file : (file.url || file.preview || URL.createObjectURL(file));
  }

  isImage(file: any): boolean {
    if (!file) return false;
    const name = file.name || '';
    return /\.(png|jpe?g|svg)$/i.test(name);
  }

  isPdf(file: any): boolean {
    if (!file) return false;
    const name = file.name || '';
    return /\.pdf$/i.test(name);
  }

  removeFile(event: any): void {
    event.stopPropagation();
    this.formGroup.get('file')?.setValue(null);
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
        this.uploadedFile = file;
        this.formGroup.get('file')?.setValue(file);
      }
    }
  }



  validateFile(file: File): boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf'];
    const maxSize = 3 * 1024 * 1024; // 3MB
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  }
}
