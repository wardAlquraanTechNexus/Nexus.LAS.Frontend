import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageService } from '../../services/language-service';
import { Labels } from '../../models/consts/labels';
import { LanguageCode } from '../../models/types/lang-type';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'select-expiry-dates',
  standalone: false,
  templateUrl: './select-expiry-dates-component.html',
  styleUrl: './select-expiry-dates-component.scss'
})
export class SelectExpiryDatesComponent implements OnInit {

  @Output() onExpirySelect = new EventEmitter<number | null>();
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  placeholder: string = "Expiry Date";
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  };
  currentLang: LanguageCode = 'en';

  listDates: any[] = [];

  constructor(private langService: LanguageService) {

  }
  ngOnInit(): void {

    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
      this.placeholder = this.label.COMMON.EXPIRY_DATE;
      this.listDates = [
        {
          label: this.label.COMMON.ALL,
          value: null
        },
        {
          label: this.label.COMMON.BEFORE_45_DAYS,
          value: -45
        },
        {
          label: this.label.COMMON.BEFORE_30_DAYS,
          value: -30
        },
        {
          label: this.label.COMMON.BEFORE_15_DAYS,
          value: -15
        },
        {
          label: this.label.COMMON.AFTER_15_DAYS,
          value: 15
        },
        {
          label: this.label.COMMON.AFTER_30_DAYS,
          value: 30
        },
        {
          label: this.label.COMMON.AFTER_45_DAYS,
          value: 45
        }
      ];

    });
  }

  selectionChange(event:any){
    this.onExpirySelect.emit(event.value);
  }

}
