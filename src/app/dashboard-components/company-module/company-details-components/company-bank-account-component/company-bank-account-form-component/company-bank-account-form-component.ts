import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyBankAccountDto } from '../../../../../models/company-models/company-bank-account/dtos/company-bank-account-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../../../environment/environment.prod';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-bank-account-form-component',
  standalone:false,
  templateUrl: './company-bank-account-form-component.html',
    styleUrls: ['../../../../_shared/styles/common-form-style.scss']
})
export class CompanyBankAccountFormComponent extends BaseFormComponent
{
  @Input() element!: CompanyBankAccountDto;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService: DynamicListService,
    override langService: LanguageService,
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
  }

}
