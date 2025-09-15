import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PersonPhone } from '../../../../../models/person-models/person-phone/person-phone';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { Observable } from 'rxjs';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { environment } from '../../../../../../environment/environment';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-person-phone-form-component',
  standalone: false,
  templateUrl: './person-phone-form-component.html',
  styleUrl: './person-phone-form-component.scss'
})
export class PersonPhoneFormComponent extends BaseFormComponent {
  @Input() showLoading = false;
  @Input() personPhone!: PersonPhone;
  loadPersonsPhonesFn!: (search: string) => Observable<DynamicList[]>;

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
    this.setup(this.personPhone);
    super.ngOnInit();
    if (this.formGroup && this.formGroup.get('phoneNumber')) {
      const ctrl = this.formGroup.get('phoneNumber');
      const existingValidators = ctrl?.validator ? [ctrl.validator] : [];
      ctrl?.setValidators([
        ...existingValidators,    
        Validators.minLength(6),
        Validators.maxLength(14)
      ]);
      ctrl?.updateValueAndValidity();
    }
    this.loadPersonsPhonesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.PersonsPhonesTypes, search)

  }
}
