import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyBoardDto } from '../../../../../models/company-models/company-board/dtos/company-board-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';

@Component({
  selector: 'app-company-board-form-component',
  standalone: false,
  templateUrl: './company-board-form-component.html',
  styleUrl: './company-board-form-component.scss'
})
export class CompanyBoardFormComponent extends BaseFormComponent {
  @Input() element!: CompanyBoardDto;

  
  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
  ) {
    super(fb, cdr, sanitizer, errorHandler);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();


  }



}
