import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { PersonsIDDetail } from '../../../../models/person-id-details/person-id-details';
import { PersonIdDetailService } from '../../../../services/person-id-detail-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetPersonIdDetailsParams } from '../../../../models/person-id-details/get-person-id-details-params';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { Sort } from '@angular/material/sort';
import { BaseParam } from '../../../../models/base/base-param';
import { env } from 'process';
import { environment } from '../../../../../environment/environment';
import { MatDialog } from '@angular/material/dialog';
import { PersonIdDetailView } from '../../person-id-detail-view/person-id-detail-view';
import { EditPersonIdDetailView } from '../../person-id-detail-view/edit-person-id-detail-view/edit-person-id-detail-view';
import { SuccessSnackbar } from '../../../../components/snackbars/success-snackbar/success-snackbar';

@Component({
  selector: 'app-person-id-documents-table-form',
  standalone: false,
  templateUrl: './person-id-documents-table-form.html',
  styleUrl: './person-id-documents-table-form.scss'
})
export class PersonIdDocumentsTableForm extends TableFormComponent<PersonsIDDetail> {

  override params: GetPersonIdDetailsParams = {
    type: null,
    nationality: null,
    page: 0,
    pageSize: 10,
    personsIdn: 0
  }

  override displayColumns: DisplayColumn[] = [
    {
      key: "type",
      label: "Type",
      keysPipes: [
        {
          key: "type",
          pipes: ['persondocumenttype']
        },
        {
          key: "isPrimary",
          pipes: ['persondocumentprimary']
        }
      ]
    },
    {
      key: "nationality",
      label: "Nationality",
    },
    {
      key: "placeOfIssue",
      label: "Place of Issue",
    },
    {
      key: "idNumber",
      label: "Number",
    },
    {
      key: "idIssueDate",
      label: "Issue Date",
      pipes: ['date'],
    },
    {
      key: "expiryDate",
      label: "Expiry Date",
      pipes: ['date'],
      sort: true
    },
    {
      key: "activeReminder",
      label: "Active Reminder",
      inputType: 'mat-slide-toggle'
    },
    {
      key: "action",
      label: "Action",
    }
  ]
  constructor(
    protected override service: PersonIdDetailService,
    protected override cdr: ChangeDetectorRef,
    protected override fb: FormBuilder,
    protected override router: Router,
    protected override snackBar: MatSnackBar,
    protected override route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super(service, cdr, fb, router, snackBar, route);
  }

  override ngOnInit(): void {
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.params.personsIdn = parseInt(personId);
    }

    this.fetchData();
  }
  override search() {
    this.fetchData();
  }

  override changeSort(sortState: Sort) {
    if (this.sortState.active == sortState.active) {
      this.sortState.direction = this.sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortState.active = sortState.active;
      this.sortState.direction = sortState.direction;;
    }
    this.params.orderBy = this.sortState.active;
    this.params.orderDir = this.sortState.direction;
    this.fetchData();
  }

  override changePage(pageEvent: BaseParam) {
    this.params.page = pageEvent.page;
    this.params.pageSize = pageEvent.pageSize;
    this.fetchData();
  }

  viewDocument(item: PersonsIDDetail) {
    const dialogRef = this.dialog.open(PersonIdDetailView, {
      panelClass: 'dialoug-container',
      disableClose: true,
      data: item

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
        this.cdr.detectChanges();
      }
    });
  }

  editDocument(item: PersonsIDDetail) {
    const dialogRef = this.dialog.open(EditPersonIdDetailView, {
      panelClass: 'dialoug-container',
      disableClose: true,
      data: item

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
        this.cdr.detectChanges();
      }
    });
  }


  getRemoveCallback(id: number): () => void {
    return () => this.deleteIdDetail(id);
  }

  deleteIdDetail(id: number) {
    this.showLoading = true;
    this.service.delete(id).subscribe({
      next: (res) => {
        this.showLoading = false;
        
        this.fetchData();

        this.cdr.markForCheck();

        this.snackBar.openFromComponent(SuccessSnackbar, {
          duration: 4000,
          data: "Deleted Successfully"
        });

      },
      error: (err) => {
        this.showLoading = false;
        this.cdr.detectChanges();
      }
    });
  }



   onRowClick(elementRow: any) {
  if (elementRow.key === "activeReminder") {
    const personIdDetail: PersonsIDDetail = elementRow.element;

    personIdDetail.activeReminder = !!personIdDetail.activeReminder ? false : true;
    this.showLoading = true;

    this.service.updateByBody(personIdDetail).subscribe({
      next: () => {
        this.snackBar.openFromComponent(SuccessSnackbar, {
          data: "Updated Successfully"
        });
        this.cdr.markForCheck();
        this.showLoading = false;
      },
      error: () => {
        personIdDetail.activeReminder = !personIdDetail.activeReminder;
        this.showLoading = false;
      }
    });
  }
}


  addToCollection(element: PersonsIDDetail) {
    this.data.collection = [];
    this.cdr.detectChanges();
    this.fetchData();

  }
}
