import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Person } from '../../../models/person-models/person';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseFormComponent } from '../../base-components/base-form-component/base-form-component';
import { PersonDto } from '../../../models/person-models/person-dto';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { DomSanitizer } from '@angular/platform-browser';
import { LanguageService } from '../../../services/language-service';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-person-form-component',
  standalone: false,
  templateUrl: './person-form-component.html',
  styleUrls: ['../../_shared/styles/common-form-style.scss']

})
export class PersonFormComponent extends BaseFormComponent {
  @Input() element!: PersonDto;
  nationalityParentId = environment.rootDynamicLists.country;


  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    protected override langService: LanguageService
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();

  }





}
