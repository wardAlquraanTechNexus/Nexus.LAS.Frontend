import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyEmailDto } from '../../../../../models/company-models/company-email/dtos/company-email-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';

@Component({
  selector: 'app-company-email-form-component',
  standalone:false,

  templateUrl: './company-email-form-component.html',
  styleUrl: './company-email-form-component.scss'
})
export class CompanyEmailFormComponent extends BaseFormComponent {
  @Input() element!: CompanyEmailDto;
  // loadCompanyActivitiesTypeFn!: (search: string) => Observable<DynamicList[]>;

  
  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    // private dlService:DynamicListService
  ) {
    super(fb, cdr, sanitizer, errorHandler);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    // this.loadCompanyActivitiesTypeFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.companyActivity, search)


  }



}
