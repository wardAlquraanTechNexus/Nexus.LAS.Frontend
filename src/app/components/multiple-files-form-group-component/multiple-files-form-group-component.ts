import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileDto } from '../../models/base/file-dto';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { base64ToBlob, downloadBlobFile } from '../../dashboard-components/_shared/shared-methods/downloadBlob';
import { LanguageService } from '../../services/language-service';
import { Labels } from '../../models/consts/labels';
import { LanguageCode } from '../../models/types/lang-type';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'multiple-files-form-group',
  standalone: false,
  templateUrl: './multiple-files-form-group-component.html',
  styleUrls: ['./multiple-files-form-group-component.scss']
})
export class MultipleFilesFormGroupComponent implements OnInit {

  @Input() fileDtos: FileDto[] = [];
  @Input() formGroup!: FormGroup;
  @Input() filesControlName: string = 'files';
  @Input() fileControlName: string = 'file';
  @Input() fileNameControl: string = 'fileName';
  @Input() fileIdControlName: string = 'fileId';
  @Input() fileIdsToRemoveControlName: string = 'fileIdsToRemove';

  // File size validation
  MAX_FILE_SIZE!:number; // in bytes
  fileSizeError: string = '';

  currentLang: LanguageCode = 'en';

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  acceptedFiles: string = '';

  constructor(
    protected fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    protected langService: LanguageService,
  ) {
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  ngOnInit(): void {
    this.fileDtos.forEach(f => this.addFileFromDto(f));
    this.acceptedFiles = environment.acceptFiles;
    this.MAX_FILE_SIZE = environment.maxFileSizeInMB * 1024 * 1024;
  }

  fileIdsToRemove: number[] = [];

  get files(): FormArray {
    const control = this.formGroup.get(this.filesControlName);
    if (control instanceof FormArray) return control;

    const arr = this.fb.array([]);
    this.formGroup.addControl(this.filesControlName, arr);
    return arr;
  }

  addFileFromDto(fileDto: FileDto) {
    if (!fileDto.data) throw new Error('Missing file data');


    let filesControl = this.formGroup.get(this.filesControlName);
    if (!(filesControl instanceof FormArray)) {
      filesControl = this.fb.array([]);
      this.formGroup.setControl(this.filesControlName, filesControl);
    }

    const filesArray = filesControl as FormArray; // Cast to FormArray

    // Convert Base64 string to Blob
    const fileBlob = base64ToBlob(fileDto.data, fileDto.contentType!);
    const file = new File([fileBlob], fileDto.fileName || 'file', { type: fileDto.contentType! });


    filesArray.push(this.fb.group({
      file: [file, Validators.required],
      fileName: [file.name],
      fileId: [fileDto.fileId || null]
    }));

  }



  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileChange(event: any) {
    const inputFiles: FileList = event.target.files;
    if (!inputFiles || inputFiles.length === 0) return;

    // Clear previous error
    this.fileSizeError = '';

    // Validate file sizes
    const oversizedFiles: string[] = [];
    const validFiles: File[] = [];

    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles[i];
      if (file.size > this.MAX_FILE_SIZE) {
        oversizedFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    }

    // Show error for oversized files
    if (oversizedFiles.length > 0) {
      const maxSizeFormatted = this.formatFileSize(this.MAX_FILE_SIZE);
      if (oversizedFiles.length === 1) {
        this.fileSizeError = `${this.label.COMMON.FILE_TOO_LARGE || 'File is too large'}: ${oversizedFiles[0]}. ${this.label.COMMON.MAX_SIZE_ALLOWED || 'Maximum size allowed'}: ${maxSizeFormatted}`;
      } else {
        this.fileSizeError = `${this.label.COMMON.FILES_TOO_LARGE || 'Some files are too large'}: ${oversizedFiles.join(', ')}. ${this.label.COMMON.MAX_SIZE_ALLOWED || 'Maximum size allowed'}: ${maxSizeFormatted}`;
      }
    }

    // Only add valid files
    if (validFiles.length > 0) {
      // Get or create FormArray
      let filesControl = this.formGroup.get(this.filesControlName);
      if (!(filesControl instanceof FormArray)) {
        filesControl = this.fb.array([]);
        this.formGroup.setControl(this.filesControlName, filesControl);
      }

      const filesArray = filesControl as FormArray; // Cast to FormArray

      // Add each valid file
      validFiles.forEach(file => {
        filesArray.push(this.fb.group({
          file: [file, Validators.required],
          fileName: [file.name],
          fileId: [null]
        }));
      });
    }

    this.cdr.detectChanges();

    // Reset input
    event.target.value = '';
  }

  removeFileControl(index: number, fileGroup: any) {
    const fileId = fileGroup.get(this.fileIdControlName)?.value;
    if (fileId) {
      this.formGroup.patchValue({
        [this.fileIdsToRemoveControlName]: 
        [...(this.formGroup.get(this.fileIdsToRemoveControlName)?.value || []), fileId]
      });
    }
    this.files.removeAt(index);
    
    // Clear file size error if all files are now valid
    if (this.files.length === 0) {
      this.fileSizeError = '';
    }
  }

  previewFile(index: number) {
    const file = this.files.at(index).get(this.fileControlName)?.value as File;
    if (file) window.open(URL.createObjectURL(file), '_blank');
  }

  downloadFile(index: number) {
    const file = this.files.at(index).get(this.fileControlName)?.value as File;
    if (file) downloadBlobFile(file, file.name);
  }
  
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getFormattedFileTypes(): string {
    if (!this.acceptedFiles) {
      return this.label.COMMON.ALL_FILES || 'All files';
    }

    // Convert accept string to readable format
    const types = this.acceptedFiles.split(',').map(type => type.trim());
    const readableTypes = types.map(type => {
      // Handle MIME types
      if (type.includes('/')) {
        const mimeMap: { [key: string]: string } = {
          'image/jpeg': 'JPEG',
          'image/jpg': 'JPG', 
          'image/png': 'PNG',
          'image/gif': 'GIF',
          'image/webp': 'WebP',
          'application/pdf': 'PDF',
          'application/msword': 'DOC',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
          'application/vnd.ms-excel': 'XLS',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
          'application/vnd.ms-powerpoint': 'PPT',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
          'text/plain': 'TXT',
          'text/csv': 'CSV',
          'application/zip': 'ZIP',
          'application/x-rar-compressed': 'RAR'
        };
        return mimeMap[type] || type.split('/')[1].toUpperCase();
      }
      
      // Handle file extensions
      if (type.startsWith('.')) {
        return type.substring(1).toUpperCase();
      }
      
      return type.toUpperCase();
    });

    // Limit display to avoid too long text
    if (readableTypes.length > 5) {
      return readableTypes.slice(0, 5).join(', ') + ` +${readableTypes.length - 5} more`;
    }

    return readableTypes.join(', ');
  }
}
