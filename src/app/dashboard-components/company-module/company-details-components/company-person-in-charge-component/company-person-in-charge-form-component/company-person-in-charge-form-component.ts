import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyPersonInChargeDto } from '../../../../../models/company-models/company-person-in-charge/get-company-person-in-charge/get-company-person-in-charge-dto';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { GetPersonsDTO } from '../../../../../models/person-models/get-persons/get-person-dto';
import { filter, map, Observable } from 'rxjs';
import { PersonService } from '../../../../../services/person-services/person-service';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { environment } from '../../../../../../environment/environment';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-person-in-charge-form-component',
  standalone: false,
  templateUrl: './company-person-in-charge-form-component.html',
    styleUrls: ['../../../../_shared/styles/common-form-style.scss']

  
})
export class CompanyPersonInChargeFormComponent extends BaseFormComponent {
  @Input() element!: CompanyPersonInChargeDto;
  loadPersonssFn!: (search: string) => Observable<GetPersonsDTO[]>;
  loadAuthorityRulesFn!: (search: string) => Observable<DynamicList[]>;
  loadDesignation!: (search: string) => Observable<DynamicList[]>;
  


  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private personService: PersonService,
    private dlService:DynamicListService,
    override langService: LanguageService,
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();

    this.loadPersonssFn = (search: string) => this.loadPersons(search);
    this.loadAuthorityRulesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.rule, search);
    this.loadDesignation = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.designation, search);

  }


  loadPersons(search: string) {
    return this.personService.getAllPersons({
      searchBy: search,
      page: 0,
      pageSize: 100
    }).pipe(
      filter(res => !!res),
      map(res =>
        res.filter(person =>
          !search ||
          (person.personEnglishName && person.personEnglishName.toLowerCase().includes(search.toLowerCase()))
        )
      )
    );
  }



}
