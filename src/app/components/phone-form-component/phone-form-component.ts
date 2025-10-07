import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language-service';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { LanguageCode } from '../../models/types/lang-type';
import { Labels } from '../../models/consts/labels';

@Component({
  selector: 'phone-form',
  standalone: false,
  templateUrl: './phone-form-component.html',
  styleUrls: ['./phone-form-component.scss']
})
export class PhoneFormComponent implements OnInit {

  @Input() formGroup!:FormGroup;
  @Input() controlName!:string
  @Input() required: boolean = false;

  currentLang: LanguageCode = 'en';
    get label() {
      return Labels[this.currentLang as keyof typeof Labels];
    }
    
  constructor(private langService: LanguageService) { }

  ngOnInit(): void {
     this.formGroup.get(this.controlName)?.setValidators([
      this.phoneValidator.bind(this)
    ]);

    this.formGroup.get(this.controlName)?.updateValueAndValidity();
    
  }

   private phoneValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    // Example: only digits, length between 7 and 15
    return /^\d{7,15}$/.test(value) ? null : { invalidPhone: true };
  }

  onPhoneInput(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').slice(0, 15);
    this.formGroup.get('phone')?.setValue(input.value, { emitEvent: false });
  }

}
