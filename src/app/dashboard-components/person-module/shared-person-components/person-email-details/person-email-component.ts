import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PersonEmailService } from '../../../../services/person-services/person-email-service';
import { PersonEmail } from '../../../../models/person-models/person-email/person-email';
import { PersonEmailDialogComponent } from './person-email-dialog-component/person-email-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { PersonDto } from '../../../../models/person-models/person-dto';
import { LanguageService } from '../../../../services/language-service';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';

@Component({
  selector: 'app-person-email-component',
  standalone: false,
  templateUrl: './person-email-component.html',
  styleUrl: './person-email-component.scss'
})
export class PersonEmailComponent implements OnInit {

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  showLoading = false;
  personEmails: PersonEmail[] = [];
  @Input() person!: PersonDto;
  @Input() readOnly = false;
  constructor(
    private route: ActivatedRoute,
    private service: PersonEmailService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    public langService: LanguageService,
  ) { }


  ngOnInit(): void {

    this.showLoading = true;
    this.fetchData();

    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }






  private fetchData() {
    this.showLoading = true;
    this.service.getAllByParams({ "personsIdn": this.person!.id }).subscribe(res => {
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
    personsIdn: this.person!.id,
    emailPrimary: false,
    createdBy: "",
    createdAt: ""
  }) {
    const dialogRef = this.dialog.open(PersonEmailDialogComponent, {
      panelClass: 'dialog-container',
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
