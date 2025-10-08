import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FPCDto } from '../../../../models/fpc-models/fpc/dtos/fpc-dto';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-fpc-overview',
  standalone: false,
  templateUrl: './fpc-overview-component.html',
  styleUrl: './fpc-overview-component.scss'
})
export class FpcOverviewComponent implements OnInit, OnChanges {

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  @Input() fpc!: FPCDto;

  constructor(
    private dynamicListService: DynamicListService,
    private langService: LanguageService) { }

  ngOnInit(): void {
    if (this.fpc) {
      this.loadData();
      this.langService.language$.subscribe(lang => {
        this.currentLang = lang;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fpc'] && changes['fpc'].currentValue) {
      this.loadData();
    }
  }

  private loadData() {
   
  }
}
