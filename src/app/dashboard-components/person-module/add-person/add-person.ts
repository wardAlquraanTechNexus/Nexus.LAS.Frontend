import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person-services/person-service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { MatDialogRef } from '@angular/material/dialog';
import { LanguageService } from '../../../services/language-service';
import { ErrorHandlerService } from '../../../services/error-handler.service';

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
    private errorHandler: ErrorHandlerService,
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
        this.errorHandler.showSuccess('Person added successfully');
        this.isSaving = false;
        this.cdRef.detectChanges();
        this.dialogRef?.close(res);
        this.router.navigate([`/${environment.routes.Persons}/view`], { queryParams: { id: res } });
      },
      error: (error) => {
        this.isSaving = false;
        this.cdRef.markForCheck();
      },
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}