import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CompanyPersonInChargeDto } from '../../../../../models/company-models/company-person-in-charge/get-company-person-in-charge/get-company-person-in-charge-dto';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { GetPersonsDTO } from '../../../../../models/person-models/get-persons/get-person-dto';
import { map, Observable } from 'rxjs';
import { PersonService } from '../../../../../services/person-services/person-service';

@Component({
  selector: 'app-company-person-in-charge-form-component',
  standalone: false,
  templateUrl: './company-person-in-charge-form-component.html',
  styleUrl: './company-person-in-charge-form-component.scss'
})
export class CompanyPersonInChargeFormComponent extends BaseFormComponent {
  @Input() element!: CompanyPersonInChargeDto;
  loadPersonssFn!: (search: string) => Observable<GetPersonsDTO[]>;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private personService: PersonService
  ) {
    super(fb, cdr, sanitizer, errorHandler);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();

    this.loadPersonssFn = (search: string) => this.loadPersons(search);

  }


  loadPersons(search: string) {
    return this.personService.getAllPersons({
      searchBy: search,
      page: 0,
      pageSize: 100
    })
  }



}
