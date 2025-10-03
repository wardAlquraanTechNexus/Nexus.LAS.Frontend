import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { TransactionRegisterDto } from '../../../../../models/transaction-models/transaction-register/dtos/transaction-register-dto';
import { filter, map, Observable } from 'rxjs';
import { EntityIDc } from '../../../../../enums/entity-idc';
import { GetCompanyDto } from '../../../../../models/company-models/get-company-query/get-company-dto';
import { GetPersonsDTO } from '../../../../../models/person-models/get-persons/get-person-dto';
import { CompanyService } from '../../../../../services/company-services/company-service';
import { PersonService } from '../../../../../services/person-services/person-service';
import { LawFirmService } from '../../../../../services/law-firm-services/law-firm-service';
import { LawFirmDTO } from '../../../../../models/law-firm-models/law-firm/dtos/law-firm-dto';

@Component({
  selector: 'app-transaction-register-form',
  standalone: false,
  templateUrl: './transaction-register-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss']
})
export class TransactionRegisterFormComponent extends BaseFormComponent {

  loadPersonssFn!: (search: string) => Observable<GetPersonsDTO[]>;
  loadCompaniesFn!: (search: string) => Observable<GetCompanyDto[]>;
  loadLawFirmsFn!: (search: string) => Observable<LawFirmDTO[]>;

  EntityIDc = EntityIDc

  @Input() element!: TransactionRegisterDto;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private personService: PersonService,
    private companyService: CompanyService,
    private lawFirmService: LawFirmService,
    override langService: LanguageService,
    private dlService: DynamicListService,

  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);

    
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    this.loadPersonssFn = (search: string) => this.loadPersons(search);
    this.loadCompaniesFn = (search: string) => this.loadCompanies(search);
    this.loadLawFirmsFn = (search: string) => this.loadLawFirms(search);

    this.formGroup.get('registerIdc')?.valueChanges.subscribe(() => {
      this.formGroup.get('registerId')?.reset();
    });
  }

  loadPersons(search: string) {
    return this.personService.getAllPersons({
      searchBy: search,
      page: 0,
      pageSize: 100
    }).pipe(
      map(res=> res.filter(p=>
        !search || p.personEnglishName && p.personEnglishName.toLowerCase().includes(search.toLowerCase())
      ))
    )
  }


  loadCompanies(search: string) {
    return this.companyService.getCompanies({
      searchBy: search,
      page: 0,
      pageSize: 100
    }).pipe(map(x => x.collection))
  }

  loadLawFirms(search: string) {
    return this.lawFirmService.getAllLawFirms({
      searchBy: search,
      page: 0,
      pageSize: 100
   }).pipe(
      map(res=> res.filter(p=>
        !search || p.englishName && p.englishName.toLowerCase().includes(search.toLowerCase())
      ))
    )
  }

}