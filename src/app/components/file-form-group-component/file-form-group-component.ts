import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../environment/environment';
import { LanguageService } from '../../services/language-service';
import { base64ToBlob, downloadBlobFile } from '../../dashboard-components/_shared/shared-methods/downloadBlob';
import { Labels } from '../../models/consts/labels';
import { LanguageCode } from '../../models/types/lang-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileDto } from '../../models/base/file-dto';

@Component({
  selector: 'file-form-group',
  standalone: false,
  templateUrl: './file-form-group-component.html',
  styleUrls: ['./file-form-group-component.scss']
})
export class FileFormGroupComponent implements OnInit {
  file: File | null = null;
  acceptFiles: string = '';
  currentLang: LanguageCode = 'en';
  @Input() element: FileDto | null = null;
  @Input() formGroup!: FormGroup;
  @Input() controlName: string = 'file';
  @Input() fileNameControl: string = 'fileName';
  @Input() removeFileControlName: string = 'removeFile';
  @Input() fileIdControlName: string = 'fileId';
  @Input() isRequired: boolean = false;

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  constructor(
    protected langService: LanguageService,
    protected fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
  }
  
  ngOnInit(): void {
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
    this.acceptFiles = environment.acceptFiles;
    if (this.element?.data) {
      const fileBlob = base64ToBlob(this.element.data, this.element.contentType!);
      const file = new File([fileBlob], this.element.fileName || 'file', { type: this.element.contentType! });
      this.file = file;
      this.formGroup.setControl(this.controlName, this.fb.control(file));
      this.formGroup.setControl(this.fileNameControl, this.fb.control(file.name));
      this.formGroup.setControl(this.fileIdControlName, this.fb.control(this.element.fileId || null));
    } else {
      this.formGroup.addControl(this.controlName, this.fb.control(null));
      this.formGroup.addControl(this.fileNameControl, this.fb.control(null));

    }
    if (this.isRequired) {
      const fileCtrl = this.formGroup.get(this.controlName);
      if (fileCtrl) {
        fileCtrl.setValidators([Validators.required]);
        fileCtrl.updateValueAndValidity();
      }
    }
  }

  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.file = input.files[0];

    this.formGroup.patchValue({
      [this.controlName]: this.file,
      [this.fileNameControl]: this.file.name
    });

    this.cdr.detectChanges();

    input.value = '';
  }

  get fileUrl(): string | null {
    return this.file ? URL.createObjectURL(this.file) : null;
  }

  previewFile() {
    if (this.file) {
      const url = this.fileUrl;
      if (!url) return;
      window.open(url, '_blank');
      URL.revokeObjectURL(url); // free memory after use
    }
  }

  downloadFile() {
    if (this.file) {
      downloadBlobFile(this.file, this.file.name);
    }
  }

  removeFileControl(): void {
    this.file = null;
    this.formGroup.patchValue({
      [this.controlName]: null,
      [this.fileNameControl]: null,
      [this.removeFileControlName]: true
    });
  }

}
