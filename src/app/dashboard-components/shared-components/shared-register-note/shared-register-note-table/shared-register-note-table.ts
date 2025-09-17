import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { RegisterNote } from '../../../../models/register-note/register-note';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { RegisterNoteService } from '../../../../services/register-note-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { GetRegisterNoteParam } from '../../../../models/register-note/params/get-register-note-param';
import { SharedRegisterNoteForm } from '../shared-register-note-form/shared-register-note-form';
import { SharedRegisterNoteFormDialog } from '../shared-register-note-form-dialog/shared-register-note-form-dialog';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-shared-register-note-table',
  standalone: false,
  templateUrl: './shared-register-note-table.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class SharedRegisterNoteTable extends TableFormComponent<RegisterNote> implements OnInit {
  @Input() registersIdc!: string;
  @Input() registersIdn!: number;
  @Input() canCrud: boolean = true;
  override params: GetRegisterNoteParam = {
    page: 0,
    pageSize: 10,
    registersIdc: "",
    registersIdn: 0
  };



  constructor(
    override service: RegisterNoteService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private menuService: MenuService,
    private dialog: MatDialog,
    override langService: LanguageService,
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit(): void {
    
    if (this.canCrud) {
      this.displayColumns.push({
        key: 'action',
        label: this.langService.getLabel('COMMON.ACTIONS') || 'Actions'
      });
    }
    this.params.registersIdc = this.registersIdc;
    this.params.registersIdn = this.registersIdn;
    super.ngOnInit();
  }

  override setDisplayColumns(): void {
    this.displayColumns = [
      {
        sort: true,
        key: "registersNotesText",
        label: this.langService.getLabel('COMMON.NOTES') || "Note"
      },
      {
        sort: true,
        key: "noteDate",
        label: this.langService.getLabel('COMMON.DATE') || "Date",
        pipes: ["date"]
      }
    ];
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

  onRowClick(row: any) {
    // Handle row click if needed
  }

  onSelectionChange(selectedRows: any[]) {
    // Handle selection change if needed
  }

}
