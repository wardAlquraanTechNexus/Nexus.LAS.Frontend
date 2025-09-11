import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyPhoneDto } from '../../../../../models/company-models/company-phone/dtos/company-phone-dto';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { Observable } from 'rxjs';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { environment } from '../../../../../../environment/environment';

@Component({
  selector: 'app-company-phone-form-component',
    standalone:false,

  templateUrl: './company-phone-form-component.html',
  styleUrl: './company-phone-form-component.scss'
})
export class CompanyPhoneFormComponent extends BaseFormComponent {
  @Input() element!: CompanyPhoneDto;
  loadPersonsPhonesFn!: (search: string) => Observable<DynamicList[]>;

  
  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService:DynamicListService
  ) {
    super(fb, cdr, sanitizer, errorHandler);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    // Add validators to phoneNumber control using formGroup
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
