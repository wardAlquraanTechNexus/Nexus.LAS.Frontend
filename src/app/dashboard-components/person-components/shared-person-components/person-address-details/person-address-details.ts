import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { CountryService } from '../../../../services/country-service';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { Country } from '../../../../models/country/country';
import { PersonAddressService } from '../../../../services/person-address-service';
import { ActivatedRoute } from '@angular/router';
import { PersonAddress } from '../../../../models/person-address/person-address';

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
  personAddresses: PersonAddress[] = [];
  personId = 0;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private countryService: CountryService,
    private personAddressService: PersonAddressService
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
    this.showLoading = true;
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.personId = parseInt(personId);
      this.personAddressService.getAllByParams({ "personsIdn": this.personId }).subscribe(
        {
          next: (res => {
            this.showLoading = false;
            this.personAddresses = res;
            this.initFromArray(this.personAddresses);
            this.cdr.detectChanges();
          }),
          error: (err => {
            this.showLoading = false;
            this.cdr.detectChanges();
          })
        }
      )


    }

  }

  initFromArray(personAddresses: PersonAddress[]) {
    this.addressesFormArray.clear();

    // Ensure only one email has emailPrimary = true
    let foundPrimary = false;
    personAddresses.forEach((personAddress, index) => {
      const isPrimary = personAddress.addressPrimary && !foundPrimary;
      if (isPrimary) {
        foundPrimary = true;
        this.primaryIndex = index;
      }
      this.addressesFormArray.push(this.createAddressGroup({ ...personAddress }));
    });

    // If none is marked as primary, make the first one primary
    if (!foundPrimary && this.personAddresses.length > 0) {
      this.setPrimary(0);
    }
  }

  createAddressGroup(personAddress?: PersonAddress): FormGroup {
    return this.fb.group({
      id:[personAddress?.id],
      addressLine1: [personAddress?.addressLine1, [Validators.required]],
      // addressLine2: [''],
      // addressLine3: [''],
      // pOBoxNumber: [''],
      pOBoxCountry: [personAddress?.poBoxCountry, [Validators.required]],
      pOBoxCity: [personAddress?.poBoxCity, [Validators.required]],
      addressPrimary: [personAddress?.addressPrimary ?? false],
      createdBy: [personAddress?.createdBy],
      creationDate: [personAddress?.creationDate],
      modefiedBy: [personAddress?.modefiedBy],
      modificationDate: [personAddress?.modificationDate],
    });
  }
  get addressesFormArray(): FormArray {
    return this.contactForm.get('addresses') as FormArray;
  }

  addAddress() {
    this.addressesFormArray.push(this.createAddressGroup());

  }

  getRemoveCallback(index: number): () => void {
    return () => this.removeAddress(index);
  }

  removeAddress(index: number): void {
    this.showLoading = true;

    const formGroup = this.addressesFormArray.at(index);

    let id = formGroup.get("id")?.value;
    let isPrimary = formGroup.get("addressPrimary")?.value;
    if (!id) {
      this.addressesFormArray.removeAt(index);
      this.showLoading = false;
      this.cdr.detectChanges();
      if (isPrimary) {
        this.setPrimary(0);
      }

    } else {
      this.personAddressService.delete(id).subscribe({
        next: (res => {
          this.addressesFormArray.removeAt(index);
          this.showLoading = false;
          if (isPrimary) {
            this.setPrimary(0);
          }
          this.cdr.detectChanges();
        }),
        error: (err => {
          this.addressesFormArray.removeAt(index);
          this.showLoading = false;
        })
      })
    }

    return;
  }

  onSave() {
      if (this.contactForm.invalid) {
        this.contactForm.markAllAsTouched();
        return;
      }
      const personAddresses: PersonAddress[] = this.addressesFormArray.controls.map(control => ({
        id: control.get('id')?.value,
        addressLine1: control.get('addressLine1')?.value,
        pOBoxCountry: control.get('pOBoxCountry')?.value,
        pOBoxCity: control.get('pOBoxCity')?.value,
        addressPrimary: control.get('addressPrimary')?.value,
        createdBy: control.get('createdBy')?.value,
        creationDate: control.get('creationDate')?.value,
        modefiedBy: control.get('modefiedBy')?.value,
        modificationDate: control.get('modificationDate')?.value,
        personsIdn: this.personId
      }));
  
      this.showLoading = true;
      this.personAddressService.bulkUpsert(personAddresses).subscribe({
        next: (res => {
          this.initFromArray(res);
          this.personAddresses = res;
          this.showLoading = false;
          this.cdr.detectChanges();
        }),
        error: (err => {
          this.showLoading = false;
          this.cdr.detectChanges();
  
        })
      })
    }
}
