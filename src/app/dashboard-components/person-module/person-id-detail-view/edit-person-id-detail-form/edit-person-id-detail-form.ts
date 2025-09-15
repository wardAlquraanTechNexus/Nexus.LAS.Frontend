import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../base-components/base-form-component/base-form-component';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { PersonIdDetailDto } from '../../../../models/person-models/person-id-details/person-id-details-dto';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DATE_FORMAT_PROVIDERS } from '../../../../shared/date-format.config';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-edit-person-id-detail-form',
  standalone: false,
  templateUrl: './edit-person-id-detail-form.html',
  styleUrl: './edit-person-id-detail-form.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    ...DATE_FORMAT_PROVIDERS,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
  ]
})
export class EditPersonIdDetailForm extends BaseFormComponent {
  @Input() personIdDetail!: PersonIdDetailDto;



  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    protected override langService: LanguageService

  ) {
    super(fb, cdr, sanitizer,errorHandler, langService);
  }
  override ngOnInit(): void {
    this.setup(this.personIdDetail);
    super.ngOnInit();
  }




  getPrimaryStyle() {
    if (this.personIdDetail.isPrimary) {
      return {
        'border': `2px solid #025EBA`,
        'color': '#025EBA',
        'border-radius': '20px',
        'padding': '10px'

      };
    }
    return {}
  }
}
