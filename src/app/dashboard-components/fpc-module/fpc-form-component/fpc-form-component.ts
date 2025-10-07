import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../base-components/base-form-component/base-form-component';
import { FPCDto } from '../../../models/fpc-models/fpc/dtos/fpc-dto';
import { FormBuilder, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { LanguageService } from '../../../services/language-service';
import { GetCompanyDto } from '../../../models/company-models/get-company-query/get-company-dto';
import { GetPersonsDTO } from '../../../models/person-models/get-persons/get-person-dto';
import { map, Observable } from 'rxjs';
import { CompanyService } from '../../../services/company-services/company-service';
import { PersonService } from '../../../services/person-services/person-service';
import { EntityIDc } from '../../../enums/entity-idc';

@Component({
  selector: 'app-fpc-form',
  standalone: false,
  templateUrl: './fpc-form-component.html',
  styleUrls: ['../../_shared/styles/common-form-style.scss'],
})
export class FpcFormComponent extends BaseFormComponent {


  @Input() element!: FPCDto;

  registerTypes: { idc: EntityIDc; name: string }[] = [
    { idc: EntityIDc.Person, name: 'Person' },
    { idc: EntityIDc.Company, name: 'Company' }
  ];

  loadPersonssFn!: (search: string) => Observable<GetPersonsDTO[]>;
  loadCompaniesFn!: (search: string) => Observable<GetCompanyDto[]>;

  EntityIDc = EntityIDc;


  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private personService: PersonService,
    private companyService: CompanyService,
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
      map(res => res.filter(p =>
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
}
