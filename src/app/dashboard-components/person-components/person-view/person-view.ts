import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Person } from '../../../models/persons/person';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../../services/person-service';
import { PersonStatus } from '../../../enums/person-status';
import { PersonDetailsForm } from '../shared-person-components/person-details-form/person-details-form';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-person-view',
  standalone: false,
  templateUrl: './person-view.html',
  styleUrl: './person-view.scss'
})
export class PersonView implements OnInit {

  selectedTab = 0
  showLoading = false;
  person: Person | null = null;
  personId = 0;
  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.personId = parseInt(personId);
      this.showLoading = true;
      this.personService.getById(this.personId).subscribe({
        next: (res) => {
          this.person = res;
          this.showLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.showLoading = false;
          this.cdr.detectChanges();

        }
      })
    }
  }


  getPersonStatusStyle() {
    let borderColor = '#9E77ED';
    let color = '#9E77ED';
    switch (this.person?.personStatus) {
      case PersonStatus.Active:
        borderColor = '#22C993';
        color = '#22C993';
        break;
      case PersonStatus.Inactive:
        borderColor = '#423e3ede';
        color = '#423e3ede';
        break;
    }
    return {
      'border': `2px solid ${borderColor}`,
      'color': color,
      'border-radius': '20px',
      'padding': '10px',

    };

  }

  getPersonPrivateStyle() {
    let borderColor = '#025EBA';
    let color = '#025EBA';
    if (!this.person?.private) {
      borderColor = '#423e3ede';
      color = '#423e3ede';
    }
    return {
      'border': `2px solid ${borderColor}`,
      'color': color,
      'border-radius': '20px',
      'padding': '10px',

    };

  }

  openPersonDialog(): void {
    const dialogRef = this.dialog.open(PersonDetailsForm, {
      width: '600px',
      data: this.person,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
            this.cdr.markForCheck();

        this.person = result;
        
      }
    });
  }
}
