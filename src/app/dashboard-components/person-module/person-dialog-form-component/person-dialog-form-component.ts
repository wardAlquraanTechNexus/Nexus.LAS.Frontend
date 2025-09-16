import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { PersonService } from '../../../services/person-services/person-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Person } from '../../../models/person-models/person';
import { BaseDialogFormComponent } from '../../base-components/base-dialog-form-component/base-dialog-form-component';
import { PersonDto } from '../../../models/person-models/person-dto';
import { LanguageService } from '../../../services/language-service';

@Component({
  selector: 'app-person-dialog-form-component',
  standalone: false,
  templateUrl: './person-dialog-form-component.html',
  styleUrl: './person-dialog-form-component.scss'
})
export class PersonDialogFormComponent extends BaseDialogFormComponent<Person> {
  constructor(
    override dialogRef: MatDialogRef<PersonDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: PersonDto,
    override service: PersonService,
    override cdr: ChangeDetectorRef,
    override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService);
  }


}
