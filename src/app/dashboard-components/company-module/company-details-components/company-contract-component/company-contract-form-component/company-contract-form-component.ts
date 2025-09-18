import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyContractDto } from '../../../../../models/company-models/company-contract/dtos/company-contract-dto';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { Observable } from 'rxjs';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { environment } from '../../../../../../environment/environment';
import { CompanyContractStatus } from '../../../../../enums/company-contract-status';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-contract-form-component',
  standalone: false,
  templateUrl: './company-contract-form-component.html',
  styleUrl: './company-contract-form-component.scss',
  providers: [
    ...DATE_FORMAT_PROVIDERS
  ]
})
export class CompanyContractFormComponent extends BaseFormComponent {

  @Input() element!: CompanyContractDto;
  loadCompanyContractTypesFn!: (search: string) => Observable<DynamicList[]>;
  statusOptions = [
    { label: 'None', value: null },
    { label: 'Expired', value: CompanyContractStatus.Expired },
    { label: 'Active', value: CompanyContractStatus.Active }
  ]
  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService: DynamicListService,
    override langService: LanguageService
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    this.loadCompanyContractTypesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.companyContractType, search);
  }

  onRemoveAttachment() {
    // Clear the file from form
    this.formGroup.get('file')?.setValue(null);

    // Clear the uploaded file
    this.uploadedFile = null;

    // Set flag to indicate file was removed
    this.isFileRemoved = true;

    // Clear display properties
    if (this.element) {
      this.element.file = null;
      this.element.imageUrl = null;
      this.element.fileName = '';
      this.element.contentType = '';
      this.element.dataFile = undefined;
    }

    this.cdr.markForCheck();
  }
}
