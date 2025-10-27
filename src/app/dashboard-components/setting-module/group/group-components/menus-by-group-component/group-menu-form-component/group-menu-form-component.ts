import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GroupMenuDTO } from '../../../../../../models/group-menu/dtos/group-menu-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../../services/language-service';
import { BaseFormComponent } from '../../../../../base-components/base-form-component/base-form-component';

@Component({
  selector: 'app-group-menu-form',
  standalone: false,
  templateUrl: './group-menu-form-component.html',
  styleUrls: ['../../../../../_shared/styles/common-form-style.scss', './group-menu-form-component.scss'],
})
export class GroupMenuFormComponent extends BaseFormComponent {

  
  @Input() element!: GroupMenuDTO;

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
