import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { LawFirmPersonDto } from '../../../../../models/law-firm-models/law-firm-person/dtos/law-firm-person-dto';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { environment } from '../../../../../../environment/environment';

@Component({
  selector: 'app-law-firm-person-form',
  standalone: false,
  templateUrl: './law-firm-person-form-component.html',
  styleUrls: ['./law-firm-person-form-component.scss']
})
export class LawFirmPersonFormComponent extends BaseFormComponent {

  staffLevelParentId!: number;

  @Input() element!: LawFirmPersonDto;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    override langService: LanguageService,
    private dlService: DynamicListService,

  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  // Validator for phone number (digits only, optional length check)
  private phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    // Example: only digits, length between 7 and 15
    return /^\d{7,15}$/.test(value) ? null : { invalidPhone: true };
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();

    this.staffLevelParentId = environment.rootDynamicLists.lawFirmsCounselLevels;

    // Add phone validator to phone control if exists
    this.formGroup.get('phone')?.setValidators([
      this.phoneValidator.bind(this)
    ]);
    this.formGroup.get('phone')?.updateValueAndValidity();
  }

}