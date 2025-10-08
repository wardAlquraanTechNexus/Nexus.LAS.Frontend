import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../../../environment/environment.prod';
import { FPCODDto } from '../../../../../models/fpc-models/fpc-od/dtos/fpc-od-dto';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FPCODActionDto } from '../../../../../models/fpc-models/fpc-od-action/dtos/fpc-od-action-dto';

@Component({
  selector: 'app-fpc-od-action-form',
  standalone: false,
  templateUrl: './fpc-od-action-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss']
})
export class FpcOdActionFormComponent extends BaseFormComponent {

  actionType!: number;

  @Input() element!: FPCODActionDto;

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

    this.actionType = environment.rootDynamicLists.originalDocumentActionTypes;

  }
}
