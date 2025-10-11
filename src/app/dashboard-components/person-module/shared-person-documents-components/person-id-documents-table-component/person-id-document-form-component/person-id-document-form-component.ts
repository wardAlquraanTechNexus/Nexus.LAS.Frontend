import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { PersonIdDetailDto } from '../../../../../models/person-models/person-id-details/person-id-details-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { Observable } from 'rxjs';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { environment } from '../../../../../../environment/environment';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-person-id-document-form-component',
  standalone: false,
  templateUrl: './person-id-document-form-component.html',
  styleUrl: './person-id-document-form-component.scss',
  providers: [
    ...DATE_FORMAT_PROVIDERS
  ]
})
export class PersonIdDocumentFormComponent extends BaseFormComponent {
  @Input() element!: PersonIdDetailDto;

  loadDocumentTypesFn!: (search: string) => Observable<DynamicList[]>;
  loadNationalitiesFn!: (search: string) => Observable<DynamicList[]>;
  loadCitiesFn!: (search: string) => Observable<DynamicList[]>;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService: DynamicListService,
    protected override langService: LanguageService

  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();

    this.loadDocumentTypesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.originalDocumentTypes, search)
    this.loadNationalitiesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.country, search)
    if (this.element.nationality) {
      this.countryId = this.element.nationality;
      this.loadCitiesFn = (search: string) => this.loadCitis(search);
    }

  }
  countryId!: number;
  onSelectCountry(event: number) {
    this.countryId = event;
    this.formGroup.get('placeOfIssue')?.reset();

    this.loadCitiesFn = (search: string) => this.dlService.GetAllByParentId(this.countryId, search);
    this.cdr.markForCheck();
  }

  loadCitis(search: string = "") {
    return this.dlService.GetAllByParentId(this.countryId, search);
  }


  expiryDate: Date | null = null;
  onExpiryDateChange(value: string) {
    if (!value) {
      this.expiryDate = null;
      return;
    }

    // parse dd/MM/yyyy
    const parts = value.split('/');
    if (parts.length === 3) {
      const day = Number(parts[0]);
      const month = Number(parts[1]) - 1;
      const year = Number(parts[2]);
      const date = new Date(year, month, day);

      if (!isNaN(date.getTime())) {
        this.expiryDate = date;
      } else {
        this.expiryDate = null; // invalid date
      }
    }
  }


}
