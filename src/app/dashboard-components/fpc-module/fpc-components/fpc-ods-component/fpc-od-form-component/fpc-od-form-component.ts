import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { environment } from '../../../../../../environment/environment';
import { FPCODDto } from '../../../../../models/fpc-models/fpc-od/dtos/fpc-od-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';

@Component({
  selector: 'app-fpc-od-form',
  standalone: false,
  templateUrl: './fpc-od-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss']
})
export class FpcOdFormComponent extends BaseFormComponent {

  originalDocumentType!: number;

  @Input() element!: FPCODDto;

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

    this.originalDocumentType = environment.rootDynamicLists.originalDocumentTypes;

  }
}
