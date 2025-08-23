import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupDTO } from '../../../../../models/group/group-dto/group-dto';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';

@Component({
  selector: 'app-group-form',
  standalone:false,
  templateUrl: './group-form.html',
  styleUrl: './group-form.scss'
})
export class GroupForm extends BaseFormComponent
{
  @Input() group!:GroupDTO;
  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
        protected override errorHandler: ErrorHandlerService,
    
  ) {
    super(fb, cdr, sanitizer,errorHandler);
  }

  override ngOnInit(): void {
    this.setup(this.group);
    super.ngOnInit();
  }
}
