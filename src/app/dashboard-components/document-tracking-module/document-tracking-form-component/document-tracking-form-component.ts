import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../base-components/base-form-component/base-form-component';
import { DocumentTrackingDto } from '../../../models/document-tracking-models/document-tracking/dtos/document-tracking-dto';
import { EntityIDc } from '../../../enums/entity-idc';
import { GetCompanyDto } from '../../../models/company-models/get-company-query/get-company-dto';
import { map, Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { CompanyService } from '../../../services/company-services/company-service';
import { LanguageService } from '../../../services/language-service';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { TransactionDto } from '../../../models/transaction-models/transaction/dtos/transaction-dto';
import { TransactionService } from '../../../services/transaction-services/transaction-service';
import { Company } from '../../../models/company-models/company';
import { AllTransactionDto } from '../../../models/transaction-models/transaction/dtos/all-transaction-dto';
import { GetPersonsDTO } from '../../../models/person-models/get-persons/get-person-dto';
import { PersonService } from '../../../services/person-services/person-service';

@Component({
  selector: 'app-document-tracking-form',
  standalone: false,
  templateUrl: './document-tracking-form-component.html',
  styleUrls: ['../../_shared/styles/common-form-style.scss'],
})
export class DocumentTrackingFormComponent extends BaseFormComponent {


  @Input() element!: DocumentTrackingDto;

  registerTypes: { idc: EntityIDc; name: string }[] = [
    { idc: EntityIDc.Company, name: 'Company' },
    { idc: EntityIDc.Transactions, name: 'Transaction' },
  ];

  loadPersonssFn!: (search: string) => Observable<GetPersonsDTO[]>;

  loadTransactionsFn!: (search: string) => Observable<AllTransactionDto[]>;
  loadCompaniesFn!: (search: string) => Observable<Company[]>;

  EntityIDc = EntityIDc;


  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private personService: PersonService,
    private companyService: CompanyService,
    private transactionService: TransactionService,
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
    this.loadTransactionsFn = (search: string) => this.loadTransactions(search);


    this.formGroup.get('registerIdc')?.valueChanges.subscribe(() => {
      this.formGroup.get('registerIdn')?.reset();
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
    return this.companyService.getAllCompanies({ searchBy: search, page: 0, pageSize: 100 });
  }

  loadTransactions(search: string) {
    return this.transactionService.getAllTransactions(search)
  }
}
