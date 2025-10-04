import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { LawFirmDTO } from '../../../../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { TransactionInvoiceDto } from '../../../../../models/transaction-models/transaction-invoice/dtos/transaction-invoice-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { LawFirmService } from '../../../../../services/law-firm-services/law-firm-service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { environment } from '../../../../../../environment/environment.prod';

@Component({
  selector: 'app-transaction-invoices-form',
  standalone: false,
  templateUrl: './transaction-invoices-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss'],
})
export class TransactionInvoicesFormComponent extends BaseFormComponent {
  @Input() element!: TransactionInvoiceDto;
  fileIdsToRemove: number[] = [];
  loadLawFirmsFn?: (search: string) => Observable<LawFirmDTO[]>;
  statuses: any[] = [];
  currencyDlId = 0;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    override langService: LanguageService,
    private lawFirmService: LawFirmService
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    this.loadLawFirmsFn = (search: string) => this.loadLawFirms(search);
    this.currencyDlId = environment.rootDynamicLists.currencies;
  }

  loadLawFirms(search: string) {
      return this.lawFirmService.getAllLawFirms({
        searchBy: search,
        page: 0,
        pageSize: 100
     }).pipe(
        map(res=> res.filter(p=>
          !search || p.englishName && p.englishName.toLowerCase().includes(search.toLowerCase())
        ))
      )
    }
 
}