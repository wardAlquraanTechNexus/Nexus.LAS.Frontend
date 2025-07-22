import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonEmailService } from '../../../../services/person-email-service';
import { PersonEmail } from '../../../../models/person-email/person-email';

@Component({
  selector: 'app-person-email-details',
  standalone: false,
  templateUrl: './person-email-details.html',
  styleUrl: './person-email-details.scss'
})
export class PersonEmailDetails implements OnInit {

  showLoading = false;
  personId = 0;
  primaryIndex: number = 0;
  contactForm!: FormGroup;
  personEmails: PersonEmail[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private personEmailService: PersonEmailService,
    private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.contactForm = this.fb.group({
      emailAddresses: this.fb.array([])
    });
    this.showLoading = true;
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.personId = parseInt(personId);
      this.personEmailService.getAllByParams({ "personsIdn": this.personId }).subscribe(res => {
        this.showLoading = false;
        this.personEmails = res;
        this.initFromArray(this.personEmails);
        this.cdr.detectChanges();
      })

    }
  }

  initFromArray(personEmails: PersonEmail[]) {
    this.emailAddresses.clear();

    // Ensure only one email has emailPrimary = true
    let foundPrimary = false;
    personEmails.forEach((personEmail, index) => {
      const isPrimary = personEmail.emailPrimary && !foundPrimary;
      if (isPrimary) {
        foundPrimary = true;
        this.primaryIndex = index;
      }
      this.emailAddresses.push(this.createEmailGroup({ ...personEmail }));
    });

    // If none is marked as primary, make the first one primary
    if (!foundPrimary && this.emailAddresses.length > 0) {
      this.setPrimary(0);
    }
  }

  setPrimary(index: number): void {
    this.primaryIndex = index;
    this.emailAddresses.controls.forEach((group, i) => {
      group.get('emailPrimary')?.setValue(i === index);
    });
  }

  createEmailGroup(personEmail?: PersonEmail): FormGroup {
    return this.fb.group({
      id: [personEmail?.id ?? 0],
      email: [personEmail?.email ?? '', [Validators.required, Validators.email]],
      type: [''],
      emailPrimary: [personEmail?.emailPrimary ?? false],
      createdBy: [personEmail?.createdBy],
      creationDate: [personEmail?.creationDate],
      modefiedBy: [personEmail?.modefiedBy],
      modificationDate: [personEmail?.modificationDate],
    });
  }

  get emailAddresses(): FormArray {
    return this.contactForm.get('emailAddresses') as FormArray;
  }

  addEmailAddress() {
    this.emailAddresses.push(this.createEmailGroup());

  }

  getRemoveEmailCallback(index: number): () => void {
    return () => this.removeEmailAddress(index);
  }
  removeEmailAddress(index: number): void {
    this.showLoading = true;

    const formGroup = this.emailAddresses.at(index);

    let id = formGroup.get("id")?.value;
    let isPrimary = formGroup.get("emailPrimary")?.value;
    if (!id) {
      this.emailAddresses.removeAt(index);
      this.showLoading = false;
      this.cdr.detectChanges();
      if (isPrimary) {
        this.setPrimary(0);
      }

    } else {
      this.personEmailService.delete(id).subscribe({
        next: (res => {
          this.emailAddresses.removeAt(index);
          this.showLoading = false;
          if (isPrimary) {
            this.setPrimary(0);
          }
          this.cdr.detectChanges();
        }),
        error: (err => {
          this.emailAddresses.removeAt(index);
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
    const personEmails: PersonEmail[] = this.emailAddresses.controls.map(control => ({
      id: control.get('id')?.value,
      email: control.get('email')?.value,
      // type: control.get('type')?.value,
      emailPrimary: control.get('emailPrimary')?.value,
      createdBy: control.get('createdBy')?.value,
      creationDate: control.get('creationDate')?.value,
      modefiedBy: control.get('modefiedBy')?.value,
      modificationDate: control.get('modificationDate')?.value,
      personsIdn: this.personId
    }));

    this.showLoading = true;
    this.personEmailService.bulkUpsert(personEmails).subscribe({
      next: (res => {
        this.initFromArray(res);
        this.personEmails = res;
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
