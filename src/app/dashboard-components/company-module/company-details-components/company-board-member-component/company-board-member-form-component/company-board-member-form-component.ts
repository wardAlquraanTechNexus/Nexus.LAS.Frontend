import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CompanyBoardMemberDto } from '../../../../../models/company-models/company-board-member/dtos/company-board-member-dto';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../../environment/environment.prod';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { GetPersonsDTO } from '../../../../../models/person-models/get-persons/get-person-dto';
import { PersonService } from '../../../../../services/person-services/person-service';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-board-member-form-component',
  standalone: false,
  templateUrl: './company-board-member-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss']
})
export class CompanyBoardMemberFormComponent extends BaseFormComponent {
  @Input() element!: CompanyBoardMemberDto;
  loadPositionsFn!: (search: string) => Observable<DynamicList[]>;
  loadPersonsFn!: (search: string) => Observable<GetPersonsDTO[]>;


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

  override ngOnInit(): void {

    this.setup(this.element);
    super.ngOnInit();
    this.loadPersonsFn = (search: string) => this.loadPersons(search);
    this.loadPositionsFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.boardPosition, search);

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