import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LanguageService } from '../../services/language-service';
import { LanguageCode } from '../../models/types/lang-type';
import { Labels } from '../../models/consts/labels';

@Component({
  selector: 'app-save-button',
  standalone: false,
  templateUrl: './save-button.html',
  styleUrls: ['./save-button.scss']
})
export class SaveButtonComponent implements OnInit {
  @Output() clickEmitter = new EventEmitter<void>();
  @Input() showLoading = false;

  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  constructor(private langService: LanguageService) {

  }
  ngOnInit(): void {
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  onclick() {
    this.clickEmitter.emit();
  }
}
