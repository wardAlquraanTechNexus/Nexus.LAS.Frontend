import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessSnackbar } from '../../../components/snackbars/success-snackbar/success-snackbar';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-add-person',
  standalone: false,
  templateUrl: './add-person.html',
  styleUrl: './add-person.scss'
})
export class AddPerson implements OnInit {


  constructor(
    private cdRef: ChangeDetectorRef,
    private personService: PersonService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {

  }



  isSaving = false;
  onSave(person: any): void {
    this.isSaving = true;
    this.personService.createPerson(person).subscribe({
      next: (res) => {
        this.snackBar.openFromComponent(SuccessSnackbar, {
          duration: 4000,
          data: "Person Created Successfully",
        });
        this.isSaving = false;
        this.cdRef.detectChanges();
        this.router.navigate([environment.routes.EditPerson], {
          queryParams: { id: res }
        });
      },
      error: () => {
        this.isSaving = false;
        this.cdRef.detectChanges();
      }
    });
  }
}