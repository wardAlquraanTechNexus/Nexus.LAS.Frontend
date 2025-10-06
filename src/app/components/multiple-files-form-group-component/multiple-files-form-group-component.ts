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

    // Get or create FormArray
    let filesControl = this.formGroup.get(this.filesControlName);
    if (!(filesControl instanceof FormArray)) {
      filesControl = this.fb.array([]);
      this.formGroup.setControl(this.filesControlName, filesControl);
    }

    const filesArray = filesControl as FormArray; // Cast to FormArray

    // Add each file
    for (let i = 0; i < inputFiles.length; i++) {
      const file = inputFiles[i];
      filesArray.push(this.fb.group({
        file: [file, Validators.required],
        fileName: [file.name],
        fileId: [null]
      }));
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
  }

  previewFile(index: number) {
    const file = this.files.at(index).get(this.fileControlName)?.value as File;
    if (file) window.open(URL.createObjectURL(file), '_blank');
  }

  downloadFile(index: number) {
    const file = this.files.at(index).get(this.fileControlName)?.value as File;
    if (file) downloadBlobFile(file, file.name);
  }
  

}
