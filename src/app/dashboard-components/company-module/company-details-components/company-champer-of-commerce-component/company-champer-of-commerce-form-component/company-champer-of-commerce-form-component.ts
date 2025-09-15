import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyLicenseDto } from '../../../../../models/company-models/company-license/dtos/company-license-dto';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyChamberOfCommerceDTO } from '../../../../../models/company-models/company-champer-of-commerce/dtos/company-champer-of-commerce-dto';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';

@Component({
  selector: 'app-company-champer-of-commerce-form-component',
  standalone:false,
  templateUrl: './company-champer-of-commerce-form-component.html',
  styleUrl: './company-champer-of-commerce-form-component.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    ...DATE_FORMAT_PROVIDERS,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
  ]
})
export class CompanyChamperOfCommerceFormComponent  extends BaseFormComponent {
  @Input() element!: CompanyChamberOfCommerceDTO;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
  ) {
    super(fb, cdr, sanitizer, errorHandler);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();


  }







 

}