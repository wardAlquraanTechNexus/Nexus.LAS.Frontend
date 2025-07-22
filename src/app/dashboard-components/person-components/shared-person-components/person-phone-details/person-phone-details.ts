import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonPhoneService } from '../../../../services/person-phone-service';
import { PersonPhone } from '../../../../models/menus/person-phone/person-phone';

@Component({
  selector: 'app-person-phone-details',
  standalone: false,
  templateUrl: './person-phone-details.html',
  styleUrl: './person-phone-details.scss'
})
export class PersonPhoneDetails implements OnInit {

  primaryIndex: number = 0;
  personId = 0;
  personPhones: PersonPhone[] = [];
  showLoading = false;


  contactForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private personPhoneService: PersonPhoneService
  ) { }

  setPrimary(index: number): void {
    this.primaryIndex = index;
    this.phonesGroupArray.controls.forEach((group, i) => {
      group.get('phonePrimary')?.setValue(i === index);
    });
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      phones: this.fb.array([])
    });
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.personId = parseInt(personId);
      this.personPhoneService.getAllByParams({ "personsIdn": this.personId }).subscribe({
        next: (res => {
          this.showLoading = false;
          this.personPhones = res;
          this.initFromArray(this.personPhones);
          this.cdr.detectChanges();

        }),
        error: (err => {
          this.showLoading = false;
          this.cdr.detectChanges();

        })
      })
    }
  }

  initFromArray(personPhones: PersonPhone[]) {
    this.phonesGroupArray.clear();

    // Ensure only one email has emailPrimary = true
    let foundPrimary = false;
    personPhones.forEach((personPhone, index) => {
      const isPrimary = personPhone.phonePrimary && !foundPrimary;
      if (isPrimary) {
        foundPrimary = true;
        this.primaryIndex = index;
      }
      this.phonesGroupArray.push(this.createEmailGroup({ ...personPhone }));
    });

    // If none is marked as primary, make the first one primary
    if (!foundPrimary && this.phonesGroupArray.length > 0) {
      this.setPrimary(0);
    }
  }

  createEmailGroup(personPhone?: PersonPhone): FormGroup {
    return this.fb.group({
      id: [personPhone?.id ?? 0],
      phoneNumber: [personPhone?.phoneNumber ?? '', [Validators.required]],
      phoneType: [personPhone?.phoneType, Validators.required],
      phonePrimary: [personPhone?.phonePrimary ?? false],
      createdBy: [personPhone?.createdBy],
      creationDate: [personPhone?.creationDate],
      modefiedBy: [personPhone?.modefiedBy],
      modificationDate: [personPhone?.modificationDate],
    });
  }

  createPhoneGroup(): FormGroup {
    return this.fb.group({
      phoneNumber: ['', [Validators.required]],
      phoneType: ['', [Validators.required]],
      phonePrimary: [false]
    });
  }
  get phonesGroupArray(): FormArray {
    return this.contactForm.get('phones') as FormArray;
  }

  addPhone() {
    this.phonesGroupArray.push(this.createPhoneGroup());

  }

  getRemoveEmailCallback(index: number): () => void {
    return () => this.removeEmailAddress(index);
  }
  removeEmailAddress(index: number): void {
    this.showLoading = true;

    const formGroup = this.phonesGroupArray.at(index);

    let id = formGroup.get("id")?.value;
    let isPrimary = formGroup.get("emailPrimary")?.value;
    if (!id) {
      this.phonesGroupArray.removeAt(index);
      this.showLoading = false;
      this.cdr.detectChanges();
      if (isPrimary) {
        this.setPrimary(0);
      }

    } else {
      this.personPhoneService.delete(id).subscribe({
        next: (res => {
          this.phonesGroupArray.removeAt(index);
          this.showLoading = false;
          if (isPrimary) {
            this.setPrimary(0);
          }
          this.cdr.detectChanges();
        }),
        error: (err => {
          this.phonesGroupArray.removeAt(index);
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
    const personEmails: PersonPhone[] = this.phonesGroupArray.controls.map(control => ({
      id: control.get('id')?.value,
      phoneNumber: control.get('phoneNumber')?.value,
      phoneType: control.get('phoneType')?.value,
      phonePrimary: control.get('phonePrimary')?.value,
      createdBy: control.get('createdBy')?.value,
      creationDate: control.get('creationDate')?.value,
      modefiedBy: control.get('modefiedBy')?.value,
      modificationDate: control.get('modificationDate')?.value,
      personsIdn: this.personId
    }));

    this.showLoading = true;
    this.personPhoneService.bulkUpsert(personEmails).subscribe({
      next: (res => {
        this.initFromArray(res);
        this.personPhones = res;
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