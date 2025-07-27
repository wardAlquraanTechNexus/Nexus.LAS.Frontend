import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonIdDocumentForm } from '../../person-id-document-form/person-id-document-form';
import { PersonOtherDocumentForm } from '../../person-other-document-form/person-other-document-form';
import { Person } from '../../../../../models/persons/person';
import { PersonsIDDetail } from '../../../../../models/person-id-details/person-id-details';
import { PersonOtherDocument } from '../../../../../models/person-other-document/person-other-document';

@Component({
  selector: 'app-person-document-form-dialouge',
  standalone: false,
  templateUrl: './person-document-form-dialouge.html',
  styleUrl: './person-document-form-dialouge.scss'
})
export class PersonDocumentFormDialouge {

  @ViewChild(PersonIdDocumentForm) idDocumentForm?: PersonIdDocumentForm;
  @ViewChild(PersonOtherDocumentForm) otherDocumentForm?: PersonOtherDocumentForm;

  selectedTab = 0;
  personId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { selectedTab: number, personId:number }, private dialogRef: MatDialogRef<PersonDocumentFormDialouge>) {
    this.selectedTab = data.selectedTab;
    this.personId = data.personId;
  }



  close(): void {
    this.dialogRef.close();
  }


  update(): void {
    if (this.selectedTab === 0 && this.idDocumentForm) {
      this.idDocumentForm.update(); // triggers save and emits event
    } else if (this.selectedTab === 1 && this.otherDocumentForm) {
      this.otherDocumentForm.update();
    }
  }

  saved(personsDocument: PersonsIDDetail | PersonOtherDocument)  {
    this.dialogRef.close(personsDocument);
  }
}
