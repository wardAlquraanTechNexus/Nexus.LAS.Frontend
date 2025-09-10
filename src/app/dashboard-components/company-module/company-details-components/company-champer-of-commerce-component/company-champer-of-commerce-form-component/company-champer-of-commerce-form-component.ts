import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyLicenseDto } from '../../../../../models/company-models/company-license/dtos/company-license-dto';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyChamberOfCommerceDTO } from '../../../../../models/company-models/company-champer-of-commerce/dtos/company-champer-of-commerce-dto';

@Component({
  selector: 'app-company-champer-of-commerce-form-component',
  standalone:false,
  templateUrl: './company-champer-of-commerce-form-component.html',
  styleUrl: './company-champer-of-commerce-form-component.scss'
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