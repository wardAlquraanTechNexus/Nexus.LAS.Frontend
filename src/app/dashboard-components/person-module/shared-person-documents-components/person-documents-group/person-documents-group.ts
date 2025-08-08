import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PersonDocumentFormDialouge } from './person-document-form-dialouge/person-document-form-dialouge';
import { ActivatedRoute } from '@angular/router';
import { PersonIdDocumentsTableForm } from '../person-id-documents-table-form/person-Id-documents-table-form';
import { PersonOtherDocumentsTableForm } from '../person-other-documents-table-form/person-other-documents-table-form';

@Component({
  selector: 'app-person-documents-group',
  standalone: false,
  templateUrl: './person-documents-group.html',
  styleUrl: './person-documents-group.scss'
})
export class PersonDocumentsGroup implements OnInit {
  selectedTab = 0;
  personId: number = 0;

  @ViewChild('PersonIdDocumentsTableForm') personIdDocumentsTableForm!: PersonIdDocumentsTableForm;
  @ViewChild('PersonOtherDocumentsTableForm') personOtherDocumentsTableForm!: PersonOtherDocumentsTableForm;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.personId = parseInt(personId);
    }

  }

  openAddDocumentDialog(): void {
    const dialogRef = this.dialog.open(PersonDocumentFormDialouge, {
      width: '700px',
      panelClass: 'no-radius-dialog',
      data: {
        selectedTab: this.selectedTab,
        personId: this.personId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.selectedTab == 0) {
          this.personIdDocumentsTableForm.addToCollection(result);
        }
        else if (this.selectedTab == 1) {
          this.personOtherDocumentsTableForm.addToCollection(result);
        }
      }
    });
  }


}
