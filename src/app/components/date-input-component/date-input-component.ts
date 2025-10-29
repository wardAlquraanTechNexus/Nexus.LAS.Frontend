import { Component, Input,  OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language-service';
import { Labels } from '../../models/consts/labels';
import { LanguageCode } from '../../models/types/lang-type';
import { DATE_FORMAT_PROVIDERS } from '../../shared/date-format.config';

@Component({
  standalone: false,
  selector: 'app-date-input',
  templateUrl: './date-input-component.html',
  styleUrls: ['./date-input-component.scss'],
  providers: [
    ...DATE_FORMAT_PROVIDERS
  ]
})
export class DateInputComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;;
  @Input() isRequired: boolean = false;
  @Input() requiredMsg!: string;

  get labels() {
    return Labels[this.currentLang as keyof typeof Labels];
  };
  currentLang: LanguageCode = 'en';


  displayValue: string = '';

  constructor(protected langService: LanguageService) {
  }
  ngOnInit() {

    if (this.isRequired) {
      const fileCtrl = this.formGroup.get(this.controlName);
      if (fileCtrl) {
        fileCtrl.setValidators([Validators.required]);
        fileCtrl.updateValueAndValidity();
      }
    }

    if (!this.requiredMsg) {
      this.requiredMsg = this.labels.COMMON.DATE_REQUIRED
    }

    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });

  }

  // Helper method for template
  get control() {
    return this.formGroup.get(this.controlName);
  }

  // Clear date method
  clearDate(event: Event) {
    event.stopPropagation();
    this.control?.setValue(null);
    this.control?.markAsTouched();
  }

}
