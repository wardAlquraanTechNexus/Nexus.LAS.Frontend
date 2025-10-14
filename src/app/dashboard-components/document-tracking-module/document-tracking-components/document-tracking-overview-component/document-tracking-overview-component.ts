import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DocumentTrackingDto } from '../../../../models/document-tracking-models/document-tracking/dtos/document-tracking-dto';
import { LanguageService } from '../../../../services/language-service';
import { LanguageCode } from '../../../../models/types/lang-type';
import { Labels } from '../../../../models/consts/labels';

@Component({
  selector: 'app-document-tracking-overview',
  standalone: false,
  templateUrl: './document-tracking-overview-component.html',
  styleUrls: ['./../../../_shared/styles/model-view-style.scss']
})
export class DocumentTrackingOverviewComponent implements OnInit, OnChanges {
  
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  @Input() documentTracking!: DocumentTrackingDto;

  constructor(
    private langService: LanguageService) { }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['documentTracking'] && changes['documentTracking'].currentValue) {
      
    }
  }

  
}
