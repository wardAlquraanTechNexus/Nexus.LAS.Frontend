import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../base-components/base-form-component/base-form-component';
import { LawFirmDTO } from '../../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { LanguageService } from '../../../services/language-service';
import { DATE_FORMAT_PROVIDERS } from '../../../shared/date-format.config';

@Component({
  selector: 'app-law-firm-form',
  standalone: false,
  templateUrl: './law-firm-form-component.html',
  styleUrls: ['../../_shared/styles/common-form-style.scss'],
  providers: [
    ...DATE_FORMAT_PROVIDERS
  ]})
export class LawFirmFormComponent  extends BaseFormComponent {

  
  @Input() element!: LawFirmDTO;

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

  // Custom validator to check if value contains only digits
  private digitsOnlyValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value == null || value === '') return null;
    return /^\d+$/.test(value) ? null : { digitsOnly: true };
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();

    const currentYear = new Date().getFullYear();
    this.formGroup.get('estYear')?.setValidators([
      Validators.min(1800),
      Validators.max(currentYear),
      this.digitsOnlyValidator.bind(this)
    ]);
    this.formGroup.get('estYear')?.updateValueAndValidity();

  }

}
