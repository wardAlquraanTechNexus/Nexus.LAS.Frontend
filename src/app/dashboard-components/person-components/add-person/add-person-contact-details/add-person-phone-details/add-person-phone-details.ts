import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-person-phone-details',
  standalone: false,
  templateUrl: './add-person-phone-details.html',
  styleUrl: './add-person-phone-details.scss'
})
export class AddPersonPhoneDetails implements OnInit {

  primaryIndex: number = 0;

  contactForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  setPrimary(index: number): void {
    this.primaryIndex = index;
    this.phones.controls.forEach((group, i) => {
      group.get('isPrimary')?.setValue(i === index);
    });
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      phones: this.fb.array([])
    });
  }

  createPhoneGroup(): FormGroup {
    return this.fb.group({
      phone: [''],
      type: [''],
      isPrimary: [false]
    });
  }
  get phones(): FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(this.createPhoneGroup());

  }

  removePhone(index: number): void {
  if (this.phones.length > 1) {
    this.phones.removeAt(index);

    // If the removed contact was primary, reset primary to first one
    if (this.primaryIndex === index) {
      this.setPrimary(0);
    } else if (this.primaryIndex > index) {
      this.primaryIndex--; // adjust index due to shift
    }
  }
}
onSave(){
  
}
}
