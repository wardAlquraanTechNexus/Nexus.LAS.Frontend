import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { CountryService } from '../../../../services/country-service';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Country } from '../../../../models/country/country';

@Component({
  selector: 'app-person-address-details',
  standalone: false,
  templateUrl: './person-address-details.html',
  styleUrl: './person-address-details.scss'
})
export class PersonAddressDetails implements OnInit {

  primaryIndex: number = 0;
  showLoading = false;
  contactForm!: FormGroup;
  country$!: Observable<Country[]>;
  searchControl = new FormControl('');
  filteredCountries$!: Observable<Country[]>;
  constructor(
    private fb: FormBuilder,
    private countryService: CountryService
  ) { }

  setPrimary(index: number): void {
    this.primaryIndex = index;
    this.addressesFormArray.controls.forEach((group, i) => {
      group.get('addressPrimary')?.setValue(i === index);
    });
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      addresses: this.fb.array([])
    });

    this.country$ = this.countryService.getAllCached();
    this.filteredCountries$ = combineLatest([
      this.country$, // your existing observable of countries
      this.searchControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([countries, search]) =>
        countries.filter(c =>
          c.countryName?.toLowerCase().includes((search ?? '').toLowerCase())
        )
      )
    );
  }

  createAddressGroup(): FormGroup {
    return this.fb.group({
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      addressLine3: [''],
      pOBoxNumber: [''],
      pOBoxCountry: ['', [Validators.required]],
      pOBoxCity: [''],
      addressPrimary: [false]
    });
  }
  get addressesFormArray(): FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addressesFormArray.push(this.createAddressGroup());

  }

  removeAddress(index: number): void {
    if (this.addressesFormArray.length > 1) {
      this.addressesFormArray.removeAt(index);

      // If the removed contact was primary, reset primary to first one
      if (this.primaryIndex === index) {
        this.setPrimary(0);
      } else if (this.primaryIndex > index) {
        this.primaryIndex--; // adjust index due to shift
      }
    }
  }
  onSave() {

  }
}
