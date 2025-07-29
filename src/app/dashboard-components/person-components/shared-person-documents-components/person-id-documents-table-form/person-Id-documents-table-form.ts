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
    protected override route: ActivatedRoute
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
    this.router.navigate([environment.routes.ViewPersonIdDetail], {
      queryParams: {
        id: item.id
      }
    });
  }
  addToCollection(element: PersonsIDDetail) {
    this.data.collection = [];
    this.cdr.detectChanges();
    this.fetchData();

  }
}
