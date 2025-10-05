import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { LawFirmDTO } from '../../../../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { TransactionInvoiceDto } from '../../../../../models/transaction-models/transaction-invoice/dtos/transaction-invoice-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { LawFirmService } from '../../../../../services/law-firm-services/law-firm-service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { environment } from '../../../../../../environment/environment.prod';
import { base64ToBlob, downloadBlobFile } from '../../../../_shared/shared-methods/downloadBlob';

@Component({
  selector: 'app-transaction-invoices-form',
  standalone: false,
  templateUrl: './transaction-invoices-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss' , './transaction-invoices-form-component.scss'],
})
export class TransactionInvoicesFormComponent extends BaseFormComponent {
  @Input() element!: TransactionInvoiceDto;
  file: File | null = null;

  loadLawFirmsFn?: (search: string) => Observable<LawFirmDTO[]>;
  statuses: any[] = [];
  currencyDlId = 0;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    override langService: LanguageService,
    private lawFirmService: LawFirmService
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    this.loadLawFirmsFn = (search: string) => this.loadLawFirms(search);
    this.currencyDlId = environment.rootDynamicLists.currencies;
    if (this.element?.file) {
      const fileBlob = base64ToBlob(this.element.data, this.element.file.contentType!);
      const file = new File([fileBlob], this.element.file.fileName || 'file', { type: this.element.file.contentType! });

      this.formGroup.setControl('file', this.fb.control(file));
      this.formGroup.setControl('fileName', this.fb.control(file.name));
      this.formGroup.setControl('fileId', this.fb.control(this.element.file.fileId || null));
    }else{
      this.formGroup.addControl('file', this.fb.control(null));
      this.formGroup.addControl('fileName', this.fb.control(null));

    }

  }

  loadLawFirms(search: string) {
    return this.lawFirmService.getAllLawFirms({
      searchBy: search,
      page: 0,
      pageSize: 100
    }).pipe(
      map(res => res.filter(p =>
        !search || p.englishName && p.englishName.toLowerCase().includes(search.toLowerCase())
      ))
    )
  }


  triggerFileInput(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.file = input.files[0];

    this.formGroup.patchValue({
      file: this.file,
      fileName: this.file.name
    });

    this.cdr.detectChanges();

    input.value = '';
  }

  override get fileUrl(): string | null {
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
      file: null,
      fileName: null
    });
    this.formGroup.addControl('removeFile', this.fb.control("true"));
  }


  saveTransactionInvoice() {
    if (this.formGroup.valid) {
      const formData = new FormData();

      // Append all form controls to the FormData
      Object.keys(this.formGroup.controls).forEach(key => {
        const value = this.formGroup.get(key)?.value;
        formData.append(key, value);
      });

      // Append the file if it exists
      if (this.file) {
        formData.append('file', this.file);
      }

      this.saveEmitter.emit({ element: this.object, formData });
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}