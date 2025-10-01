import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TransactionDto } from '../../../../models/transaction-models/transaction/dtos/transaction-dto';
import { LanguageService } from '../../../../services/language-service';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';
import { DynamicListService } from '../../../../services/dynamic-list-service';

@Component({
  selector: 'app-transaction-overview',
  standalone: false,
  templateUrl: './transaction-overview-component.html',
  styleUrls: ['./transaction-overview-component.scss']
})
export class TransactionOverviewComponent implements OnInit, OnChanges {

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  @Input() transaction!: TransactionDto;

  constructor(
    private dynamicListService: DynamicListService,
    private langService: LanguageService) { }

  ngOnInit(): void {
    if (this.transaction) {
      this.loadData();
      this.langService.language$.subscribe(lang => {
        this.currentLang = lang;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lawFirm'] && changes['lawFirm'].currentValue) {
      this.loadData();
    }
  }

  private loadData() {
   
  }
}
