import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../../services/person-service';
import { Person } from '../../../models/persons/person';
import { UpdatePersonCommand } from '../../../models/persons/update-person';
import { PersonStatus } from '../../../enums/person-status';

@Component({
  selector: 'app-edit-person',
  standalone: false,
  templateUrl: './edit-person.html',
  styleUrl: './edit-person.scss'
})
export class EditPerson implements OnInit {
  isSaving = false;
  showLoading = false;
  person: Person | null = null;
  personId = 0;
  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private cdr: ChangeDetectorRef) { }

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

  onSave(person: UpdatePersonCommand) {
    person.id = this.personId;
    this.isSaving = true;
    this.personService.updatePerson(person).subscribe({
      next: (res => {
        this.person = res;
        this.isSaving = false;
        this.cdr.detectChanges();

      }),
      error: (err => {
        this.isSaving = false;
        this.cdr.detectChanges();

      })
    })
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
    if(!this.person?.private) 
      {
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
}
