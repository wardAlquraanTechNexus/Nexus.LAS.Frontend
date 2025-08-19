import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person-services/person-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessSnackbar } from '../../../components/snackbars/success-snackbar/success-snackbar';
import { environment } from '../../../../environment/environment';
import { MatDialogRef } from '@angular/material/dialog';
import { LanguageService } from '../../../services/language-service';

@Component({
  selector: 'app-add-person',
  standalone: false,
  templateUrl: './add-person.html',
  styleUrl: './add-person.scss'
})
export class AddPerson implements OnInit {

  labels: any;

  constructor(
    private cdRef: ChangeDetectorRef,
    private personService: PersonService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AddPerson>,
    private router: Router,
    private langService: LanguageService) {

  }

  ngOnInit(): void {
    this.langService.language$.subscribe(lang => {
      this.labels = this.langService.getLabels(lang);
    });
  }



  isSaving = false;
  onSave(person: any): void {
    this.isSaving = true;
    this.personService.createPerson(person).subscribe({
      next: (res) => {
        this.snackBar.openFromComponent(SuccessSnackbar, {
          duration: 4000,
          data: this.labels.personCreatedSuccessfully,
        });
        this.isSaving = false;
        this.cdRef.detectChanges();
        this.dialogRef?.close(res);
        this.router.navigate([`/${environment.routes.Persons}/view`], { queryParams: { id: res } });
      },
      error: () => {
        this.isSaving = false;
        this.cdRef.markForCheck();
      },
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}