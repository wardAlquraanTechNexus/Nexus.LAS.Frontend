import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonPhoneService } from '../../../../services/person-phone-service';
import { PersonPhone } from '../../../../models/menus/person-phone/person-phone';
import { PersonEmail } from '../../../../models/person-email/person-email';
import { PersonPhoneDialouge } from './person-phone-dialouge/person-phone-dialouge';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-person-phone-details',
  standalone: false,
  templateUrl: './person-phone-details.html',
  styleUrl: './person-phone-details.scss'
})
export class PersonPhoneDetails implements OnInit {

  personId = 0;
  personPhones: PersonPhone[] = [];
  showLoading = false;


  contactForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private service: PersonPhoneService,
    private dialog: MatDialog

  ) { }



  ngOnInit(): void {
    this.contactForm = this.fb.group({
      phones: this.fb.array([])
    });
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.personId = parseInt(personId);
      this.fetchData();
    }
  }

  private fetchData() {
    this.showLoading = true;
    this.service.getAllByParams({ "personsIdn": this.personId }).subscribe({
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


  openFormDetails(personPhone: PersonPhone = {
    phoneNumber: "",
    personsIdn: this.personId,
    phonePrimary: false,
    createdBy: "",
    creationDate: "",
    phoneType: 0
  }) {
    const dialogRef = this.dialog.open(PersonPhoneDialouge, {
      panelClass: 'dialoug-container',
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