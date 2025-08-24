import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonIdDocumentForm } from '../../person-id-document-form/person-id-document-form';
import { PersonOtherDocumentForm } from '../../person-other-document-form/person-other-document-form';
import { PersonOtherDocument } from '../../../../../models/person-models/person-other-document/person-other-document';
import { PersonsIDDetail } from '../../../../../models/person-models/person-id-details/person-id-details';

@Component({
  selector: 'app-person-document-form-dialog',
  standalone: false,
  templateUrl: './person-document-form-dialog.html',
  styleUrls: ['./person-document-form-dialog.scss']
})
export class PersonDocumentFormDialog {

  @ViewChild(PersonIdDocumentForm) idDocumentForm?: PersonIdDocumentForm;
  @ViewChild(PersonOtherDocumentForm) otherDocumentForm?: PersonOtherDocumentForm;

  selectedTab = 0;
  personId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { selectedTab: number, personId: number }
    , private dialogRef: MatDialogRef<PersonDocumentFormDialog>,
    protected cdr: ChangeDetectorRef) {
    this.selectedTab = data.selectedTab;
    this.personId = data.personId;
  }

  close(): void {
    this.dialogRef.close();
  }

  update(): void {
    if (this.selectedTab === 0 && this.idDocumentForm) {
      this.idDocumentForm.update();
    } else if (this.selectedTab === 1 && this.otherDocumentForm) {
      this.otherDocumentForm.update();
    }
  }

  saved(personsDocument: PersonsIDDetail | PersonOtherDocument) {
    this.cdr.detectChanges();
    this.dialogRef.close(personsDocument);
  }
}
