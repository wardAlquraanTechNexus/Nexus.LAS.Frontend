import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { CountryService } from '../../../../services/country-service';
import { combineLatest, map, Observable, of, startWith } from 'rxjs';
import { Country } from '../../../../models/country/country';
import { PersonAddressService } from '../../../../services/person-address-service';
import { ActivatedRoute } from '@angular/router';
import { PersonAddress } from '../../../../models/person-address/person-address';
import { MatDialog } from '@angular/material/dialog';
import { PersonAddressDialog } from './person-address-dialog/person-address-dialog';

@Component({
  selector: 'app-person-address-details',
  standalone: false,
  templateUrl: './person-address-details.html',
  styleUrl: './person-address-details.scss'
})
export class PersonAddressDetails implements OnInit {

  showLoading = false;
  country$!: Observable<Country[]>;
  // [
  //   {
  //     countryName: "UAE",
  //     id: 1
  //   },
  //   {
  //     countryName: "Jordan",
  //     id: 2
  //   }
  // ];
  searchControl = new FormControl('');
  filteredCountries$!: Observable<Country[]>;
  personAddresses: PersonAddress[] = [];
  personId = 0;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private countryService: CountryService,
    private personAddressService: PersonAddressService,
    private dialog: MatDialog
  ) { }



  ngOnInit(): void {

    // this.country$ = this.countryService.getAllCached();
    // this.filteredCountries$ = combineLatest([
    //   this.country$, // your existing observable of countries
    //   this.searchControl.valueChanges.pipe(startWith(''))
    // ]).pipe(
    //   map(([countries, search]) =>
    //     countries.filter(c =>
    //       c.countryName?.toLowerCase().includes((search ?? '').toLowerCase())
    //     )
    //   )
    // );

    this.country$ = of([
      {
        countryName: "UAE",
        id: 1
      },
      {
        countryName: "Jordan",
        id: 2
      }
    ]);

    this.filteredCountries$ = combineLatest([
      this.country$,
      this.searchControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      map(([countries, search]) =>
        countries.filter(c =>
          c.countryName?.toLowerCase().includes((search ?? '').toLowerCase())
        )
      ))
    this.showLoading = true;
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.personId = parseInt(personId);
      this.fetchData();


    }

  }



  private fetchData() {
    this.personAddressService.getAllByParams({ "personsIdn": this.personId }).subscribe(
      {
        next: (res => {
          this.showLoading = false;
          this.personAddresses = res;
          this.cdr.detectChanges();
        }),
        error: (err => {
          this.showLoading = false;
          this.cdr.detectChanges();
        })
      }
    );
  }

  getRemoveCallback(id: number): () => void {
    return () => this.removeAddress(id);
  }

  removeAddress(id: number): void {
    this.showLoading = true;

    this.personAddressService.delete(id).subscribe({
      next: (res => {
        this.showLoading = false;

        this.fetchData();
      }),
      error: (err => {
        this.showLoading = false;
      })
    })
  }

  openFormDetails(personAddress: PersonAddress = {
    personsIdn: this.personId,
    addressPrimary: false,
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    poBoxCity: "",
    poBoxCountry: "",
    poBoxNumber: "",
    createdBy: "",
    creationDate: ""
  }) {
  const dialogRef = this.dialog.open(PersonAddressDialog, {
      panelClass: 'dialog-container',
      disableClose: true,
      data: personAddress

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }


  getPrimaryStyle(isPrimary: boolean) {
    let borderColor = '#025EBA';
    let color = '#025EBA';
    if (!isPrimary) {
      return {};
    }
    return {
      'border': `2px solid ${borderColor}`,
      'color': color,
      'border-radius': '20px',
      'padding': '10px',

    };
  }


}
