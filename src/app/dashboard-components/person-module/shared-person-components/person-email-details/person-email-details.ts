import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonEmailService } from '../../../../services/person-email-service';
import { PersonEmail } from '../../../../models/person-email/person-email';
import { PersonEmailDialog } from './person-email-dialog/person-email-dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-person-email-details',
  standalone: false,
  templateUrl: './person-email-details.html',
  styleUrl: './person-email-details.scss'
})
export class PersonEmailDetails implements OnInit {

  showLoading = false;
  personId = 0;
  personEmails: PersonEmail[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: PersonEmailService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }


  ngOnInit(): void {

    this.showLoading = true;
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.personId = parseInt(personId);
      this.fetchData();
    }
  }






  private fetchData() {
    this.showLoading = true;
    this.service.getAllByParams({ "personsIdn": this.personId }).subscribe(res => {
      this.showLoading = false;
      this.personEmails = res;
      this.cdr.detectChanges();
    });
  }

  getRemoveEmailCallback(index: number): () => void {
    return () => this.removeEmailAddress(index);
  }
  removeEmailAddress(id: number): void {
    this.showLoading = true;
    this.service.delete(id).subscribe({
      next: (res => {
        this.showLoading = false;
        this.cdr.detectChanges();
      }),
      error: (err => {
        this.showLoading = false;
      })
    })


    return;
  }

  openFormDetails(personEmail: PersonEmail = {
    email: "",
    personsIdn: this.personId,
    emailPrimary: false,
    createdBy: "",
    creationDate: ""
  }) {
  const dialogRef = this.dialog.open(PersonEmailDialog, {
      panelClass: 'dialoug-container',
      disableClose: true,
      data: personEmail

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
