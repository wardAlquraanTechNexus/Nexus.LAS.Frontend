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

    this.statuses = Object.keys(TransactionActionStatus)
      .filter(k => isNaN(Number(k))) // keep only names
      .map(k => ({
        value: k,
        label: k
      }));

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
    if (this.element.id) {
      formData.append('actionStatus', formValue.actionStatus);
    }

    const dueDate = formValue.dueDate ? new Date(formValue.dueDate) : null;
    const closedDate = formValue.closedDate ? new Date(formValue.closedDate) : null;

    formData.append('dueDate', dueDate ? dueDate.toISOString() : '');
    formData.append('closedDate', closedDate ? closedDate.toISOString() : '');

    if( formValue.fileIdsToRemove && formValue.fileIdsToRemove.length > 0 ){
      formValue.fileIdsToRemove.forEach((id: number) => {
        formData.append('fileIdsToRemove', id.toString());
      });
    }
    if(formValue.files && formValue.files.length > 0)
    {
      formValue.files?.forEach((fileObj: any) => {
        if (fileObj.file && !fileObj.fileId) formData.append('files', fileObj.file, fileObj.fileName);
      });

    }

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