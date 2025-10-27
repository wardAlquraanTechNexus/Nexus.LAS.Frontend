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
  isFileRemoved = false; // Track if file was removed
  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  @Input() showLoading:boolean = false;
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
    this.subscripeLanguage();
  }
  
  subscripeLanguage(){
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
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
      this.cdr.markForCheck();
    }
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

 


  validateFile(file: File): boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf'];
    const maxSize = 3 * 1024 * 1024; // 3MB
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  }
}
