import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonOtherDocumentService } from '../../../../../services/person-services/person-other-document-service';
import { PersonOtherDocument } from '../../../../../models/person-models/person-other-document/person-other-document';
import { Observable } from 'rxjs';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { environment } from '../../../../../../environment/environment';
import { PersonOtherDocumentDTO } from '../../../../../models/person-models/person-other-document/person-other-document-dto';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-person-other-document-form-component',
  standalone: false,
  templateUrl: './person-other-document-form-component.html',
  styleUrl: './person-other-document-form-component.scss'
})
export class PersonOtherDocumentFormComponent extends BaseFormComponent {
  @Input() element!: PersonOtherDocumentDTO;

  loadDocumentTypesFn!: (search: string) => Observable<DynamicList[]>;

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

    this.loadDocumentTypesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.otherDocumentType, search)

  }
  


}
