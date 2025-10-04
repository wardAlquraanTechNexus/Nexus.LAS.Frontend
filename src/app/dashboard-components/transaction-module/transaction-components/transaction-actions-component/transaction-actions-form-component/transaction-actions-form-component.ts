import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { TransactionActionDto } from '../../../../../models/transaction-models/transaction-action/dtos/transaction-dto';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { PersonService } from '../../../../../services/person-services/person-service';
import { GetPersonsDTO } from '../../../../../models/person-models/get-persons/get-person-dto';
import { map, Observable } from 'rxjs';
import { base64ToBlob, downloadBlob, downloadBlobFile } from '../../../../_shared/shared-methods/downloadBlob';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import { FileDto } from '../../../../../models/base/file-dto';
import { TransactionActionStatus } from '../../../../../models/transaction-models/transaction-action/enums/transaction-action-status';

@Component({
  selector: 'app-transaction-actions-form',
  standalone: false,
  templateUrl: './transaction-actions-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss'],
  providers: [
    ...DATE_FORMAT_PROVIDERS
  ]
})
export class TransactionActionsFormComponent extends BaseFormComponent {
  @Input() element!: TransactionActionDto;
  fileIdsToRemove: number[] = [];
  loadPersonsFn?: (search: string) => Observable<GetPersonsDTO[]>;
  statuses: any[] = [];

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    override langService: LanguageService,
    private personService: PersonService
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element); // Initialize formGroup
    super.ngOnInit();

    // Ensure files FormArray exists
    if (!this.formGroup.get('files')) {
      this.formGroup.addControl('files', this.fb.array([]));
    }

    this.loadPersonsFn = (search: string) => this.loadPersons(search);

    // Load existing files if any
    this.element?.files?.forEach(f => this.addFileFromDto(f));

    this.statuses = Object.keys(TransactionActionStatus)
      .filter(k => isNaN(Number(k))) // keep only names
      .map(k => ({
        value: k,
        label: k
      }));

  }

  get files(): FormArray {
    const control = this.formGroup.get('files');
    if (control instanceof FormArray) return control;

    const arr = this.fb.array([]);
    this.formGroup.addControl('files', arr);
    return arr;
  }

  addFileFromDto(fileDto: FileDto) {
    if (!fileDto.data) throw new Error('Missing file data');


    let filesControl = this.formGroup.get('files');
    if (!(filesControl instanceof FormArray)) {
      filesControl = this.fb.array([]);
      this.formGroup.setControl('files', filesControl);
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
    let filesControl = this.formGroup.get('files');
    if (!(filesControl instanceof FormArray)) {
      filesControl = this.fb.array([]);
      this.formGroup.setControl('files', filesControl);
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
    const fileId = fileGroup.get('fileId')?.value;
    if (fileId) {
      this.fileIdsToRemove.push(fileId);
    }
    this.files.removeAt(index);
  }

  previewFile(index: number) {
    const file = this.files.at(index).get('file')?.value as File;
    if (file) window.open(URL.createObjectURL(file), '_blank');
  }

  downloadFile(index: number) {
    const file = this.files.at(index).get('file')?.value as File;
    if (file) downloadBlobFile(file, file.name);
  }

  saveTransactionAction() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    const formValue = this.formGroup.value;
    const formData = new FormData();

    formData.append('id', this.element?.id?.toString() || '0');
    formData.append('transactionId', this.element.transactionId.toString());
    formData.append('description', formValue.description || '');
    formData.append('personId', formValue.personId?.toString() || '');
    formData.append('time', formValue.time?.toString() || '');
    if(this.element.id){
      formData.append('actionStatus', formValue.actionStatus);
    }

    const dueDate = formValue.dueDate ? new Date(formValue.dueDate) : null;
    const closedDate = formValue.closedDate ? new Date(formValue.closedDate) : null;

    formData.append('dueDate', dueDate ? dueDate.toISOString() : '');
    formData.append('closedDate', closedDate ? closedDate.toISOString() : '');

    this.fileIdsToRemove.forEach(id => {
      formData.append('fileIdsToRemove', id.toString());
    });
    formValue.files?.forEach((fileObj: any) => {
      if (fileObj.file && !fileObj.fileId) formData.append('files', fileObj.file, fileObj.fileName);
    });

    this.saveEmitter.emit({ element: this.object, formData });
  }

  private loadPersons(search: string) {
    return this.personService.getAllPersons({ searchBy: search, page: 0, pageSize: 100 }).pipe(
      map(res => res.filter(p =>
        !search || p.personEnglishName?.toLowerCase().includes(search.toLowerCase())
      ))
    );
  }
}