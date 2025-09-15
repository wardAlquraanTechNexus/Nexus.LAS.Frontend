import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompaniesShareHolderDto } from '../../../../../models/company-models/company-share-holder/dtos/company-share-holder-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { EntityIDc, EntityIDcType } from '../../../../../enums/entity-idc';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { PersonService } from '../../../../../services/person-services/person-service';
import { GetPersonsDTO } from '../../../../../models/person-models/get-persons/get-person-dto';
import { map, Observable } from 'rxjs';
import { CompanyService } from '../../../../../services/company-services/company-service';
import { GetCompanyDto } from '../../../../../models/company-models/get-company-query/get-company-dto';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import { LanguageService } from '../../../../../services/language-service';


@Component({
  selector: 'app-company-shareholder-form-component',
  standalone: false,
  templateUrl: './company-shareholder-form-component.html',
  styleUrl: './company-shareholder-form-component.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    ...DATE_FORMAT_PROVIDERS,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
  ]
})
export class CompanyShareholderFormComponent extends BaseFormComponent {
  @Input() element!: CompaniesShareHolderDto;
  loadPersonssFn!: (search: string) => Observable<GetPersonsDTO[]>;
  loadCompaniesFn!: (search: string) => Observable<GetCompanyDto[]>;

  EntityIDc = EntityIDc

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private personService: PersonService,
    private companyService:CompanyService,
    override langService: LanguageService,
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    this.loadPersonssFn = (search: string) => this.loadPersons(search);
    this.loadCompaniesFn = (search: string) => this.loadCompanies(search);

      this.formGroup.get('registersIdc')?.valueChanges.subscribe(() => {
          this.formGroup.get('registersIdn')?.reset();
        });
  }


  loadPersons(search: string) {
    return this.personService.getAllPersons({
      searchBy: search,
      page: 0,
      pageSize: 100
    })
  }


  loadCompanies(search: string) {
    return this.companyService.getCompanies({
      searchBy: search,
      page: 0,
      pageSize: 100
    }).pipe(map(x=>x.collection))
  }



}
