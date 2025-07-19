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


  ngOnInit(): void {
    this.contactForm = this.fb.group({
      addresses: this.fb.array([])
    });
  }

}
