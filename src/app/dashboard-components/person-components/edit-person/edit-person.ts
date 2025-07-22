import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../../../services/person-service';
import { Person } from '../../../models/persons/person';
import { UpdatePersonCommand } from '../../../models/persons/update-person';

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
}
