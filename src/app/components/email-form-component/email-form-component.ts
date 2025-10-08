import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { Labels } from '../../models/consts/labels';
import { LanguageCode } from '../../models/types/lang-type';
import { LanguageService } from '../../services/language-service';

@Component({
  selector: 'email-form',
  standalone: false,
  templateUrl: './email-form-component.html',
  styleUrls: ['./email-form-component.scss']
})
export class EmailFormComponent  implements OnInit {

  @Input() formGroup!:FormGroup;
  @Input() controlName!:string
  @Input() required: boolean = false;
  @Input() labelValue: string = '';

  currentLang: LanguageCode = 'en';
    get label() {
      return Labels[this.currentLang as keyof typeof Labels];
    }
    
  constructor(private langService: LanguageService) { }

  ngOnInit(): void {
     this.formGroup.get('email')?.setValidators([
      Validators.email
    ]);
    this.formGroup.get('email')?.updateValueAndValidity();

    if (!this.labelValue) {
      this.labelValue = this.label.COMMON.EMAIL ;
    }
  }


}
