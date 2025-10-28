import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Country } from '../../../../models/country/country';
import { PersonAddressService } from '../../../../services/person-services/person-address-service';
import { ActivatedRoute } from '@angular/router';
import { PersonAddress } from '../../../../models/person-models/person-address/person-address';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { environment } from '../../../../../environment/environment';
import { PersonDto } from '../../../../models/person-models/person-dto';
import { PersonAddressDialogComponent } from './person-address-dialog-component/person-address-dialog-component';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-person-address-component',
  standalone: false,
  templateUrl: './person-address-component.html',
  styleUrl: './person-address-component.scss'
})
export class PersonAddressComponent implements OnInit, OnDestroy {
  @Input() person!: PersonDto;
  @Input() readOnly = false;

  // Unsubscribe subject
  private destroy$ = new Subject<void>();

  showLoading = false;
  countries: Map<number, string> = new Map<number, string>();
  cities: Map<number, string> = new Map<number, string>();

  searchControl = new FormControl('');
  filteredCountries$!: Observable<Country[]>;
  personAddresses: PersonAddress[] = [];
  
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private personAddressService: PersonAddressService,
    private dialog: MatDialog,
    private dlService: DynamicListService,
    public langService: LanguageService,
  ) { }

  ngOnInit(): void {
    this.showLoading = true;
    if (this.person) {
      this.fetchData();
    }

    // Subscribe to countries and cities with unsubscribe logic
    this.dlService.GetAllByParentId(environment.rootDynamicLists.country)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          res.forEach(country => {
            this.countries.set(country.id, country.name);
            
            // Subscribe to cities for each country with unsubscribe logic
            this.dlService.GetAllByParentId(country.id)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (cityRes) => {
                  cityRes.forEach(city => {
                    this.cities.set(city.id, city.name);
                  });
                },
                error: (err) => {
                  console.error('Error fetching cities:', err);
                }
              });
          });
        },
        error: (err) => {
          console.error('Error fetching countries:', err);
        }
      });

    // Subscribe to language changes with unsubscribe logic
    this.langService.language$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => {
        this.currentLang = lang;
      });
  }

  ngOnDestroy(): void {
    // Complete the destroy subject to unsubscribe from all observables
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchData() {
    this.personAddressService.getAllByParams({ "personsIdn": this.person.id })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.showLoading = false;
          this.personAddresses = res;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.showLoading = false;
          console.error('Error fetching person addresses:', err);
          this.cdr.detectChanges();
        }
      });
  }

  getRemoveCallback(id: number): () => void {
    return () => this.removeAddress(id);
  }

  removeAddress(id: number): void {
    this.showLoading = true;

    this.personAddressService.delete(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.showLoading = false;
          this.fetchData();
        },
        error: (err) => {
          this.showLoading = false;
          console.error('Error removing address:', err);
        }
      });
  }

  openFormDetails(personAddress: PersonAddress = {
    personsIdn: this.person.id,
    addressPrimary: false,
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    poBoxCity: null,
    poBoxCountry: null,
    poBoxNumber: "",
    createdBy: "",
    createdAt: ""
  }) {
    const dialogRef = this.dialog.open(PersonAddressDialogComponent, {
      panelClass: 'dialog-container',
      disableClose: true,
      data: personAddress
    });

    // Subscribe to dialog close with unsubscribe logic
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
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
