import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-menu-form',
  standalone:false,
  templateUrl: './menu-form.html',
  styleUrl: './menu-form.scss'
})
export class MenuForm extends BaseFormComponent
{
  @Input() menu!: any;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
  ) {
    super(fb, cdr, sanitizer);
  }

  override ngOnInit(): void {
    this.setup(this.menu);
    super.ngOnInit();
  }
}
