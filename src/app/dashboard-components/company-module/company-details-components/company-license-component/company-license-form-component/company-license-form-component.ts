import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyLicenseDto } from '../../../../../models/company-models/company-license/dtos/company-license-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { CompanyLicenseStatus } from '../../../../../enums/company-license-status';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-license-form-component',
  standalone: false,
  templateUrl: './company-license-form-component.html',
  styleUrl: './company-license-form-component.scss',
  providers: [
    ...DATE_FORMAT_PROVIDERS
  ]
})
export class CompanyLicenseFormComponent extends BaseFormComponent {
  @Input() element!: CompanyLicenseDto;
  statusOptions = [
    { label: 'Expired', value: CompanyLicenseStatus.Expired },
    { label: 'Active', value: CompanyLicenseStatus.Active }
  ]; constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    override langService: LanguageService,
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
  }

}
