import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DocumentTrackingActionDto } from '../../../../../models/document-tracking-models/document-tracking-action/dto/document-tracking-action-dto';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';

@Component({
  selector: 'app-document-tracking-action-form',
  standalone: false,
  templateUrl: './document-tracking-action-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss'],
})
export class DocumentTrackingActionFormComponent extends BaseFormComponent {

  @Input() element!: DocumentTrackingActionDto;
  actionTypes = [
    { "label" : "In" , "value" : "In" },
    { "label" : "Out" , "value" : "Out" }
  ]

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
