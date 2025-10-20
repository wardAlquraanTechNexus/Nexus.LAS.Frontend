import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GetPersonsDTO } from '../../../../../models/person-models/get-persons/get-person-dto';
import { map, Observable } from 'rxjs';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { PersonService } from '../../../../../services/person-services/person-service';
import { UserDto } from '../../../../../models/user/dtos/user-dto';
import { LinkUserPersonParam } from '../../../../../models/user/param/link-user-person-param';

@Component({
  selector: 'app-user-form',
  standalone: false,
  templateUrl: './user-form-component.html',
  styleUrls: ['./../../../../_shared/styles/common-form-style.scss']
})
export class UserFormComponent extends BaseFormComponent {
  @Input() element!: LinkUserPersonParam;

  loadPersonsFn?: (search: string) => Observable<GetPersonsDTO[]>;
  statuses: any[] = [];

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    override langService: LanguageService,
    private personService: PersonService
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element); // Initialize formGroup
    super.ngOnInit();

    this.loadPersonsFn = (search: string) => this.loadPersons(search);
  }



  private loadPersons(search: string) {
    return this.personService.getAllPersons({ searchBy: search, page: 0, pageSize: 100 }).pipe(
      map(res => res.filter(p =>
        !search || p.personEnglishName?.toLowerCase().includes(search.toLowerCase())
      ))
    );
  }
}