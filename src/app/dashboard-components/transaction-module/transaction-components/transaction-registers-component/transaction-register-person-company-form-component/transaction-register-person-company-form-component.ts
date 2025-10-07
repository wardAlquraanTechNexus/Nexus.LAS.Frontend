import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, map } from 'rxjs';
import { EntityIDc } from '../../../../../enums/entity-idc';
import { GetCompanyDto } from '../../../../../models/company-models/get-company-query/get-company-dto';
import { GetPersonsDTO } from '../../../../../models/person-models/get-persons/get-person-dto';
import { TransactionRegisterDto } from '../../../../../models/transaction-models/transaction-register/dtos/transaction-register-dto';
import { CompanyService } from '../../../../../services/company-services/company-service';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { LawFirmService } from '../../../../../services/law-firm-services/law-firm-service';
import { PersonService } from '../../../../../services/person-services/person-service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';

@Component({
  selector: 'app-transaction-register-person-company-form',
  standalone : false,
  templateUrl: './transaction-register-person-company-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss']
})
export class TransactionRegisterPersonCompanyFormComponent  extends BaseFormComponent {

  loadPersonssFn!: (search: string) => Observable<GetPersonsDTO[]>;
  loadCompaniesFn!: (search: string) => Observable<GetCompanyDto[]>;
  showPersonField: boolean = false;

  EntityIDc = EntityIDc;
  companyId!: number;

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
    this.loadCompaniesFn = (search: string) => this.loadCompanies(search);
    if(this.element.companyId){
      this.companyId = this.element.companyId;
      this.loadPersonssFn = (search: string) => this.loadPersons(search);

    }

    this.formGroup.get('registerIdc')?.valueChanges.subscribe(() => {
      this.formGroup.get('registerId')?.reset();
    });
  }

  loadPersons(search: string) {
    this.showPersonField = true;
    return this.personService.getAllPersonsCompany(this.companyId , search)
    
  }


  loadCompanies(search: string) {
    return this.companyService.getCompanies({
      searchBy: search,
      page: 0,
      pageSize: 100
    }).pipe(map(x => x.collection))
  }

  onSelectCompany(companyId: number) {
    this.showPersonField = false;
    this.formGroup.get('personId')?.reset();
    setTimeout(() => {
      this.companyId = companyId;
      this.loadPersonssFn = (search: string) => this.loadPersons(search);
      this.showPersonField = true;
      this.cdr.markForCheck();
    },100);
  }


}