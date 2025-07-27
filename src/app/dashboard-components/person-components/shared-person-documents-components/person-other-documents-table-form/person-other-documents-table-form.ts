import { ChangeDetectorRef, Component } from '@angular/core';
import { PersonOtherDocument } from '../../../../models/person-other-document/person-other-document';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { GetPerdonOtherDocument } from '../../../../models/person-other-document/get-person-other-document';
import { PersonOtherDocumentService } from '../../../../services/person-other-document-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseParam } from '../../../../models/base/base-param';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-person-other-documents-table-form',
  standalone:false,
  templateUrl: './person-other-documents-table-form.html',
  styleUrl: './person-other-documents-table-form.scss'
})
export class PersonOtherDocumentsTableForm extends TableFormComponent<PersonOtherDocument> 
{
  override displayColumns = [
    {
      key: "documentType",
      label: "Type",
    },
    {
      key: "documentDescription",
      label: "Description"
    }
  ];

  override params : GetPerdonOtherDocument = {
    personIdn:  null,
    documentType: null,
    page: 0,
    pageSize: 10
  };

  constructor(
    protected override service: PersonOtherDocumentService,
    protected override cdr: ChangeDetectorRef,
    protected override fb: FormBuilder,
    protected override router: Router,
    protected override snackBar: MatSnackBar,
    protected override route: ActivatedRoute
  ) {
    super(service, cdr, fb, router, snackBar, route);
  }

  override ngOnInit(){
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.params.personIdn = parseInt(personId);
    }
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

    addToCollection(element: PersonOtherDocument) 
    {
      this.data.collection.push(element);
      this.data.totalRecords++;
      this.data.pageSize++;
      this.cdr.detectChanges();
    }
}
