import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { LawFirmExpertiseDto } from '../../../../../models/law-firm-models/law-firm-expertise/dtos/law-firm-expertise-dto';

@Component({
  selector: 'app-law-firm-expertise-form',
  standalone: false,
  templateUrl: './law-firm-expertise-form-component.html',
  styleUrl: './law-firm-expertise-form-component.scss'
})
export class LawFirmExpertiseFormComponent  extends BaseFormComponent {


  @Input() element!: LawFirmExpertiseDto;

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

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();


  }

}