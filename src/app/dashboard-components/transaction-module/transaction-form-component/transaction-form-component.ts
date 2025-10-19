import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../base-components/base-form-component/base-form-component';
import { TransactionDto } from '../../../models/transaction-models/transaction/dtos/transaction-dto';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { LanguageService } from '../../../services/language-service';
import { environment } from '../../../../environment/environment';
import { DATE_FORMAT_PROVIDERS } from '../../../shared/date-format.config';

@Component({
  selector: 'app-transaction-form',
  standalone: false,
  templateUrl: './transaction-form-component.html',
  styleUrls: ['../../_shared/styles/common-form-style.scss'],

})
export class TransactionFormComponent  extends BaseFormComponent {

  transactionTypeParentId: number | null = null;
  @Input() element!: TransactionDto;

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
    this.transactionTypeParentId = environment.rootDynamicLists.transactionTypes;
  }
}
