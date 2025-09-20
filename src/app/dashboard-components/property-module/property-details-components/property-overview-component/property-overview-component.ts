import { Component, Input, OnInit } from '@angular/core';
import { PropertyDTO } from '../../../../models/property-models/property/dtos/propery-dto';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-property-overview',
  standalone: false,
  templateUrl: './property-overview-component.html',
  styleUrl: './property-overview-component.scss'
})
export class PropertyOverviewComponent implements OnInit {
  @Input() property!: PropertyDTO;

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  constructor(
    private dynamicListService: DynamicListService,
    private langService: LanguageService) { }


  ngOnInit(): void {
    if (this.property) {
      this.langService.language$.subscribe(lang => {
        this.currentLang = lang;
      });
    }
  }
}
