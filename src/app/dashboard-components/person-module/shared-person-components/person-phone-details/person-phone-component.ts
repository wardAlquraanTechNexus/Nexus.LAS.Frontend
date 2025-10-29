import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonPhoneService } from '../../../../services/person-services/person-phone-service';
import { PersonEmail } from '../../../../models/person-models/person-email/person-email';
import { PersonPhoneDialogComponent } from './person-phone-dialog-component/person-phone-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { PersonPhone } from '../../../../models/person-models/person-phone/person-phone';
import { PersonDto } from '../../../../models/person-models/person-dto';
import { LanguageService } from '../../../../services/language-service';
import { LanguageCode } from '../../../../models/types/lang-type';
import { Labels } from '../../../../models/consts/labels';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { DynamicList } from '../../../../models/dynamic-list/dynamic-list';
import { environment } from '../../../../../environment/environment';

@Component({
  selector: 'app-person-phone-component',
  standalone: false,
  templateUrl: './person-phone-component.html',
  styleUrl: './person-phone-component.scss'
})
export class PersonPhoneComponent implements OnInit {

  @Input() person!: PersonDto;
  personPhones: PersonPhone[] = [];
  showLoading = false;
  @Input() readOnly = false;
  phoneTypes: DynamicList[] = [];

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  contactForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private service: PersonPhoneService,
    private dialog: MatDialog,
    public langService: LanguageService,
    private dlService: DynamicListService

  ) { }



  ngOnInit(): void {
    this.contactForm = this.fb.group({
      phones: this.fb.array([])
    });

    this.loadPhoneTypes();
    this.fetchData();
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  private loadPhoneTypes(): void {
    this.dlService.GetAllByParentId(environment.rootDynamicLists.PersonsPhonesTypes, '').subscribe({
      next: (res) => {
        this.phoneTypes = res;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load phone types', err);
      }
    });
  }

  private fetchData() {
    this.showLoading = true;
    this.service.getAllByParams({ "personsIdn": this.person.id }).subscribe({
      next: (res => {
        this.showLoading = false;
        this.personPhones = res;
        this.cdr.detectChanges();

      }),
      error: (err => {
        this.showLoading = false;
        this.cdr.detectChanges();

      })
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

  getPhoneTypeName(phoneTypeId?: number): string {
    if (!phoneTypeId) return '';
    const phoneType = this.phoneTypes.find(pt => pt.id === phoneTypeId);
    return phoneType?.name || '';
  }


  openFormDetails(personPhone: PersonPhone = {
    phoneNumber: "",
    personsIdn: this.person.id,
    phonePrimary: false,
    phoneType: 0,
    phoneNumberNote: ""
  }) {
    const dialogRef = this.dialog.open(PersonPhoneDialogComponent, {
      panelClass: 'dialog-container',
      disableClose: true,
      data: personPhone

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  getRemoveCallback(id: number): () => void {
    return () => this.removeAddress(id);
  }

  removeAddress(id: number): void {
    this.showLoading = true;

    this.service.delete(id).subscribe({
      next: (res => {
        this.showLoading = false;
        this.fetchData();

      }),
      error: (err => {
        this.showLoading = false;
      })
    })
  }
}