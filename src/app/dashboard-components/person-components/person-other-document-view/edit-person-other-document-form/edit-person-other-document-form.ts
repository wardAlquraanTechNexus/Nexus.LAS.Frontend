import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { PersonOtherDocumentDTO } from '../../../../models/person-other-document/person-other-document-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonOtherDocumentService } from '../../../../services/person-other-document-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { BaseFormComponent } from '../../../base-components/base-form-component/base-form-component';
import { FileDto } from '../../../../models/base/file-dto';

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
    protected override snackBar: MatSnackBar,
    protected override sanitizer: DomSanitizer,


  ) {
    super(fb,cdr,snackBar,sanitizer);
  }
  
  override ngOnInit(): void {
    this.setup(this.personOtherDocumentDto);
    super.ngOnInit();
  }

  
}
