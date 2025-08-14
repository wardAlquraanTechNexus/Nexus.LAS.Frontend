import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RegisterNote } from '../../../../models/register-note/register-note';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { RegisterNoteService } from '../../../../services/register-note-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuService } from '../../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { GetRegisterNoteParam } from '../../../../models/register-note/params/get-register-note-param';
import { SharedRegisterNoteForm } from '../shared-register-note-form/shared-register-note-form';
import { SharedRegisterNoteFormDialog } from '../shared-register-note-form-dialog/shared-register-note-form-dialog';

@Component({
  selector: 'app-shared-register-note-table',
  standalone: false,
  templateUrl: './shared-register-note-table.html',
  styleUrl: './shared-register-note-table.scss'
})
export class SharedRegisterNoteTable extends TableFormComponent<RegisterNote> implements OnInit {
  @Input() registersIdc!: string;
  @Input() registersIdn!: number;
  override params: GetRegisterNoteParam = {
    page: 0,
    pageSize: 10,
    registersIdc: "",
    registersIdn: 0
  };

  override displayColumns: DisplayColumn[] =
    [
      {
        sort: true,
        key: "registersNotesText",
        label: "Note"
      },
      {
        sort: true,
        key: "noteDate",
        label: "Date",
        pipes: [
          "date"
        ]
      },{
        key:"action",
        label:"actions"
      }
    ];

  constructor(
    override service: RegisterNoteService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override snackBar: MatSnackBar,
    override route: ActivatedRoute,
    private menuService: MenuService,
    private dialog: MatDialog
  ) {
    super(service, cdr, fb, router, snackBar, route);
  }

  override ngOnInit(): void {
    this.params.registersIdc = this.registersIdc;
    this.params.registersIdn = this.registersIdn;
    super.ngOnInit();
  }

  addNote() {
    this.upsertDialog({
        id: null,
        registersNotesText: "",
        noteDate: null,
        registersIdc: this.registersIdc,
        registersIdn: this.registersIdn
    })
  }
  


  upsertDialog(data:any){
const dialogRef = this.dialog.open(SharedRegisterNoteFormDialog, {
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      panelClass: 'custom-dialog-container',
      data: data

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
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
  edit(row: any) {
    this.upsertDialog(row);
  }



}
