import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Labels } from '../../models/consts/labels';
import { LanguageCode } from '../../models/types/lang-type';
import { LanguageService } from '../../services/language-service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'select-reminder',
  standalone: false,
  templateUrl: './select-reminder-component.html',
  styleUrl: './select-reminder-component.scss'
})
export class SelectReminderComponent implements OnInit {

  @Output() onSelect = new EventEmitter<boolean | null>();
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  };
  currentLang: LanguageCode = 'en';

  list: any[] = [];

  constructor(private langService: LanguageService) {

  }
  ngOnInit(): void {
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
      this.list = [
        {
          label: this.label.COMMON.ALL,
          value: null
        },
        {
          label: this.label.COMMON.ACTIVE_REMINDER,
          value: true
        },
        {
          label: this.label.COMMON.NOT_ACTIVE_REMINDER,
          value: false
        }
      ];

    });
  }

  select(event:any){
    this.onSelect.emit(event.value)
  }
}
