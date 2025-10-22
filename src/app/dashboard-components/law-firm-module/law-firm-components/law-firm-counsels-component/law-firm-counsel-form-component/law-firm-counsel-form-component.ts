import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { LawFirmCounselDto } from '../../../../../models/law-firm-models/law-firm-counsel/dtos/law-firm-counsel-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../../../environment/environment';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';

@Component({
  selector: 'app-law-firm-counsel-form',
  standalone : false,
  templateUrl: './law-firm-counsel-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss']
})
export class LawFirmCounselFormComponent  extends BaseFormComponent {

  staffLevelParentId!: number;

  @Input() element!: LawFirmCounselDto;

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

    this.staffLevelParentId = environment.rootDynamicLists.lawFirmsCounselLevels;

  }

}