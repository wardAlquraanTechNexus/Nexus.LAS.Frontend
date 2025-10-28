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
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-contract-form-component',
  standalone: false,
  templateUrl: './company-contract-form-component.html',
    styleUrls: ['../../../../_shared/styles/common-form-style.scss']

})
export class CompanyContractFormComponent extends BaseFormComponent {

  @Input() element!: CompanyContractDto;
  loadCompanyContractTypesFn!: (search: string) => Observable<DynamicList[]>;
  statusOptions = [
    { label: 'None', value: null },
    { label: 'Active', value: CompanyContractStatus.Active },
    { label: 'Amended', value: CompanyContractStatus.Amended },
    { label: 'Expired', value: CompanyContractStatus.Expired },
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

}
