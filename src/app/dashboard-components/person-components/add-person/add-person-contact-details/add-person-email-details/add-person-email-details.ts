import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-person-email-details',
  standalone:false,
  templateUrl: './add-person-email-details.html',
  styleUrl: './add-person-email-details.scss'
})
export class AddPersonEmailDetails implements OnInit {

  primaryIndex: number = 0;

  contactForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  setPrimary(index: number): void {
    this.primaryIndex = index;
    this.emailAddresses.controls.forEach((group, i) => {
      group.get('isPrimary')?.setValue(i === index);
    });
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      emailAddresses: this.fb.array([])
    });
  }

  createEmailGroup(): FormGroup {
    return this.fb.group({
      email: [''],
      type: [''],
      isPrimary: [false]
    });
  }
  get emailAddresses(): FormArray {
    return this.contactForm.get('emailAddresses') as FormArray;
  }

  addEmailAddress() {
    this.emailAddresses.push(this.createEmailGroup());

  }

  removeEmailAddress(index: number): void {
  if (this.emailAddresses.length > 1) {
    this.emailAddresses.removeAt(index);

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
