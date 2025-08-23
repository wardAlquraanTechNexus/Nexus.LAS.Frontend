import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';

@Component({
  selector: 'app-dynamic-list-form',
  standalone: false,
  templateUrl: './dynamic-list-form.html',
  styleUrl: './dynamic-list-form.scss'
})
export class DynamicListForm extends BaseFormComponent {
  @Input() dynamicList!: any;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,

  ) {
    super(fb, cdr, sanitizer,errorHandler);
  }

  override ngOnInit(): void {
    this.setup(this.dynamicList);
    super.ngOnInit();
  }
}
