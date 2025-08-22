import { ChangeDetectorRef, Component } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { GroupDTO } from '../../../../models/group/group-dto/group-dto';
import { GetGroupDTOQuery } from '../../../../models/group/group-dto/get-group-dto';

import { PaginateRsult } from '../../../../models/paginate-result';

import { DisplayColumn } from '../../../../models/columns/display-column';
import { GroupService } from '../../../../services/group-service';
import { FormBuilder } from '@angular/forms';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Group } from '../../../../models/group/group';
import { GroupFormDialog } from './group-form-dialog/group-form-dialog';

@Component({
  selector: 'app-group-table',
  standalone: false,
  templateUrl: './group-table.html',
  styleUrl: './group-table.scss'
})
export class GroupTable extends TableFormComponent<Group> {
  override data: PaginateRsult<GroupDTO> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: GetGroupDTOQuery = {
    groupName: null,
    id: null,
    page: 0,
    pageSize: 10
  };


  override displayColumns: DisplayColumn[] = [
    {
      key: "id",
      label: "Group Id",
    },
    {
      key: "groupName",
      label: "Group Name",
    },
    {
      key: "description",
      label: "Description",
    },
    {
      key: "action",
      label: "Action",
    },

  ]

  constructor(
    override service: GroupService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    protected dialog: MatDialog,
  ) {
    super(service, cdr, fb, router, errorHandler, route);
  }

  override fetchData() {
    this.showLoading = true;
    this.service.getGroupsDto(this.params).subscribe({
      next: (res => {
        this.data = res;
        this.showLoading = false;
        this.cdr.markForCheck();
      }),
      error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();

      })
    })
  }

  onAddNew() {
    let group: GroupDTO = {
      id: 0,
      groupName: "",
      description: ""
    };
    const dialogRef = this.dialog.open(GroupFormDialog, {
      disableClose: true,
      data: group
    });
    
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.fetchData();
    }})
  }


  edit(group: any) {
    const dialogRef = this.dialog.open(GroupFormDialog, {
      disableClose: true,
      data: group
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data.collection = [
          ...this.data.collection,
          result
        ];
        this.cdr.markForCheck();
      }
    });
  }

   
  getRemoveCallback(id: number): () => void {
    return () => this.delete(id);
  }

  delete(id: number) {
    this.showLoading = true;
    this.service.delete(id).subscribe({
      next:res=>{
        this.fetchData();
      },
      error:(err=>{
        this.showLoading = false;
      })
    })
  }

}
