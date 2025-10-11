import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { PropertyDocumentDTO } from '../../../../../models/property-models/property-document/dtos/property-document-dto';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { environment } from '../../../../../../environment/environment';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';

@Component({
  selector: 'app-property-document-form',
  standalone: false,
  templateUrl: './property-document-form-component.html',
  styleUrls: ['./property-document-form-component.scss'],
  providers: [
      ...DATE_FORMAT_PROVIDERS
    ]
})
export class PropertyDocumentFormComponent extends BaseFormComponent {
  @Input() element!: PropertyDocumentDTO;
  propertyDocumentTypeId = environment.rootDynamicLists.propertyDocumentType;

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
    this.setup(this.element);
    super.ngOnInit();
  }

  

}
