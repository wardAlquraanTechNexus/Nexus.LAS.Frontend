import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../base-components/base-form-component/base-form-component';
import { GetCompanyDto } from '../../../models/company/get-company-query/get-company-dto';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder } from '@angular/forms';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { DynamicList } from '../../../models/dynamic-list/dynamic-list';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ErrorHandlerService } from '../../../services/error-handler.service';

@Component({
  selector: 'app-company-form',
  standalone: false,
  templateUrl: './company-form.html',
  styleUrl: './company-form.scss'
})
export class CompanyForm extends BaseFormComponent {
  @Input() company!: GetCompanyDto;


  loadCompanyTypeFn!: (search: string) => Observable<DynamicList[]>;
  loadCompanyClassFn!: (search: string) => Observable<DynamicList[]>;
  loadGroupCompanyFn!: (search: string) => Observable<DynamicList[]>;
  loadLegalTypeFn!: (search: string) => Observable<DynamicList[]>;
  loadRelevantCompanyFn!: (search: string) => Observable<DynamicList[]>;
  loadPlaceOfRegistrationMainFn!: (search: string) => Observable<DynamicList[]>;
  loadPlaceOfRegistrationSubFn!: (search: string) => Observable<DynamicList[]>;


  mainRegistrationId!: number;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService: DynamicListService,

  ) {
    super(fb, cdr, sanitizer, errorHandler);
  }

  override ngOnInit(): void {
    this.setup(this.company);
    super.ngOnInit();

    this.loadCompanyTypeFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.companyType, search)
    this.loadGroupCompanyFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.groupCompany, search)
    this.loadLegalTypeFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.legalType, search)
    this.loadRelevantCompanyFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.relevantCompany, search)
    this.loadPlaceOfRegistrationMainFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.placeOfRegistration, search)

  }

  onSelectMainRegistrtaion(event: number) {

    if(event){
      this.loadPlaceOfRegistrationSubFn = (search: string) => this.dlService.GetAllByParentId(event, search);
    }else{
      this.loadPlaceOfRegistrationSubFn = (search: string) => this.dlService.GetAllByParentId(0, search);
    }
    this.cdr.markForCheck();
  }

  onCompanyType(event: number) {
    if(event){
      this.loadCompanyClassFn = (search: string) => this.dlService.GetAllByParentId(event, search);
    }else{
      this.loadCompanyClassFn = (search: string) => this.dlService.GetAllByParentId(0, search);
    }
    this.cdr.markForCheck();
  }




}
