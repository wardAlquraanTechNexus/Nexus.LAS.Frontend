import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { PropertyOwnerDTO } from '../../../../../models/property-models/property-owner/dtos/property-owner-dto';
import { PropertyOwnerService } from '../../../../../services/property-services/property-owner-service';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, map, Observable } from 'rxjs';
import { PropertyDTO } from '../../../../../models/property-models/property/dtos/propery-dto';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { GetCompanyDto } from '../../../../../models/company-models/get-company-query/get-company-dto';
import { GetPersonsDTO } from '../../../../../models/person-models/get-persons/get-person-dto';
import { CompanyService } from '../../../../../services/company-services/company-service';
import { PersonService } from '../../../../../services/person-services/person-service';
import { EntityIDc } from '../../../../../enums/entity-idc';
import { Company } from '../../../../../models/company-models/company';
import { environment } from '../../../../../../environment/environment';

@Component({
  selector: 'app-property-owner-form',
  standalone: false,
  templateUrl: './property-owner-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss']

})
export class PropertyOwnerFormComponent extends BaseFormComponent {

  EntityIDc = EntityIDc;

  loadPersonssFn!: (search: string) => Observable<GetPersonsDTO[]>;
  loadCompaniesFn!: (search: string) => Observable<Company[]>;
  propertyRelationId!: number;

  @Input() element!: PropertyOwnerDTO;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    override langService: LanguageService,
    private dlService: DynamicListService,
    private service: PropertyOwnerService,
    private personService: PersonService,
    private companyService: CompanyService,

  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    this.loadPersonssFn = (search: string) => this.loadPersons(search);
    this.loadCompaniesFn = (search: string) => this.loadCompanies(search);
    this.propertyRelationId = environment.rootDynamicLists.propertyOwnerRelation;

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


  loadCompanies(search: string) {
    return this.companyService.getAllCompanies({
      searchBy: search,
      page: 0,
      pageSize: 100
    }).pipe(map(res => res.filter(c =>
      c.companyEnglishName && c.companyEnglishName.toLowerCase().includes(search.toLowerCase())
    )))
  }


}