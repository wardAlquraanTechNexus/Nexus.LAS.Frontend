import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { LawFirmBranchDto } from '../../../../../models/law-firm-models/law-firm-branch/dtos/law-firm-branch-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../../../environment/environment.prod';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';

@Component({
  selector: 'app-law-firm-branch-form',
  standalone : false,
  templateUrl: './law-firm-branch-form-component.html',
  styleUrl: './law-firm-branch-form-component.scss'
})
export class LawFirmBranchFormComponent  extends BaseFormComponent {

  countryId!: number;

  @Input() element!: LawFirmBranchDto;

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

    this.countryId = environment.rootDynamicLists.country;

  }

}