import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-person-address-details',
  standalone: false,
  templateUrl: './add-person-address-details.html',
  styleUrl: './add-person-address-details.scss'
})
export class AddPersonAddressDetails implements OnInit {

   primaryIndex: number = 0;

  contactForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  setPrimary(index: number): void {
    this.primaryIndex = index;
    this.addresses.controls.forEach((group, i) => {
      group.get('isPrimary')?.setValue(i === index);
    });
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      addresses: this.fb.array([])
    });
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      address: [''],
      country: [''],
      city: [''],
      isPrimary: [false]
    });
  }
  get addresses(): FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addresses.push(this.createAddressGroup());

  }

  removeAddress(index: number): void {
  if (this.addresses.length > 1) {
    this.addresses.removeAt(index);

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
