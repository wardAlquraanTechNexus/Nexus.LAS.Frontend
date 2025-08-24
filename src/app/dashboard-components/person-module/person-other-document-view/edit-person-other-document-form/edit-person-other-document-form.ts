import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PersonOtherDocumentService } from '../../../../services/person-services/person-other-document-service';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseFormComponent } from '../../../base-components/base-form-component/base-form-component';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { PersonOtherDocumentDTO } from '../../../../models/person-models/person-other-document/person-other-document-dto';

@Component({
  selector: 'app-edit-person-other-document-form',
  standalone: false,
  templateUrl: './edit-person-other-document-form.html',
  styleUrls: ['./edit-person-other-document-form.scss', '../person-other-document-view.scss']
})
export class EditPersonOtherDocumentForm extends BaseFormComponent {
  @Input() personOtherDocumentDto!: PersonOtherDocumentDTO;


  constructor(
    protected  service: PersonOtherDocumentService,
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,


  ) {
    super(fb, cdr, sanitizer,errorHandler);
  }
  
  override ngOnInit(): void {
    this.setup(this.personOtherDocumentDto);
    super.ngOnInit();
  }

  
}
