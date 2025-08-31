import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyBankAccountDto } from '../../../../../models/company-models/company-bank-account/dtos/company-bank-account-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../../../environment/environment.prod';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';

@Component({
  selector: 'app-company-bank-account-form-component',
  standalone:false,
  templateUrl: './company-bank-account-form-component.html',
  styleUrl: './company-bank-account-form-component.scss'
})
export class CompanyBankAccountFormComponent extends BaseFormComponent
{
  @Input() element!: CompanyBankAccountDto;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService: DynamicListService
  ) {
    super(fb, cdr, sanitizer, errorHandler);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    

  }
}
