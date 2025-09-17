import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyAccountSignatoryDto } from '../../../../../models/company-models/company-account-signatory/dtos/company-account-signatory-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { GetPersonsDTO } from '../../../../../models/person-models/get-persons/get-person-dto';
import { map, Observable, tap } from 'rxjs';
import { PersonService } from '../../../../../services/person-services/person-service';
import { environment } from '../../../../../../environment/environment';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-account-signatory-form-component',
  standalone: false,
  templateUrl: './company-account-signatory-form-component.html',
  styleUrl: './company-account-signatory-form-component.scss',
  providers: [
    ...DATE_FORMAT_PROVIDERS
  ]
})
export class CompanyAccountSignatoryFormComponent extends BaseFormComponent {
  loadPersonssFn!: (search: string) => Observable<GetPersonsDTO[]>;
  loadRulesFn!: (search: string) => Observable<DynamicList[]>;

  @Input() element!: CompanyAccountSignatoryDto;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService: DynamicListService,
    private personService: PersonService,
    override langService: LanguageService,

  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  

  loadPersons(search: string) {
    return this.personService.getAllPersons({
      searchBy: search,
      page: 0,
      pageSize: 100
    }).pipe(
      map(res => res.filter(p =>
        p.personEnglishName && p.personEnglishName.toLowerCase().includes(search.toLowerCase())
      ))
    );
  }

  
}
