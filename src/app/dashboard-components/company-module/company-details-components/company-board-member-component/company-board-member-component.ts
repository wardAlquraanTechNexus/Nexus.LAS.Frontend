import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CompanyBoardDto } from '../../../../models/company-models/company-board/dtos/company-board-dto';
import { CompanyBoardMember } from '../../../../models/company-models/company-board-member/company-board-member';
import { CompanyBoardMemberDto } from '../../../../models/company-models/company-board-member/dtos/company-board-member-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { GetCompanyBoardParams } from '../../../../models/company-models/company-board/params/get-company-board';
import { CompanyBoardMemberService } from '../../../../services/company-services/company-board-member-service';
import { CompanyBoardMemberDialogFormComponent } from './company-board-member-dialog-form-component/company-board-member-dialog-form-component';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MatDialog } from '@angular/material/dialog';
import { GetCompanyBoardMemberParams } from '../../../../models/company-models/company-board-member/params/get-company-board-member';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';

@Component({
  selector: 'app-company-board-member-component',
  standalone: false,
  templateUrl: './company-board-member-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class CompanyBoardMemberComponent extends TableFormComponent<CompanyBoardMember> {
  @Input() company!: GetCompanyDto;

  override data: PaginateRsult<CompanyBoardMemberDto> = {
    collection: [],
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0
  };

  override displayColumns: DisplayColumn[] = [
    {
      key: "personId",
      label: "Person",
      pipes: ["person"]
    },
    {
      key: "position",
      label: "Position",
      pipes: ["board-position"]
    },
    {
      key: "appointmentDate",
      label: "Date of Appintment",
      pipes: ["date"]
    },
    {
      key: "cessationDate",
      label: "Date of cessation",
      pipes: ["date"]
    },
    {
      key: "isActive",
      label: "Status",
      pipes: ["active"]
    },
    {
      key: 'action',
      label: 'Actions'
    }
  ]

  override params: GetCompanyBoardMemberParams = {
    companyId: 0,
    page: 0,
    pageSize: 10
  };

  constructor(
    override service: CompanyBoardMemberService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super(service, cdr, fb, router, errorHandler, route)
  }
  override ngOnInit(): void {
    this.params.companyId = this.company.id;
    super.ngOnInit();
  }

  override fetchData(): void {
    this.showLoading = true;
    this.service.getPaging(this.params)
      .subscribe({
        next: (res => {
          this.data = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        }),
        error: (err => {
          this.showLoading = false;
          this.errorHandler.handleApiError(err, 'Failed to load data');
          this.cdr.markForCheck();
        })
      })
  }



  onAddNew() {
    const element: CompanyBoardMemberDto = {
      id: 0,
      personId: 0,
      appointmentDate: "",
      cessationDate: null,
      position: 0,
      companyId: this.company.id,
      isActive: false,
    };
    const dialogRef = this.dialog.open(CompanyBoardMemberDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(row: any) {
    const element = { ...row };
    const dialogRef = this.dialog.open(CompanyBoardMemberDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })

  }

  deleteFn(id: number) {
    return () => this.delete(id);
  }

  delete(id: number) {
    this.showLoading = true;
    this.service.delete(id).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Deleted Successfully");
        this.showLoading = false;
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
      })
    })
  }

  showTable = true;
  toggleTable() {
    this.showTable = !this.showTable;
  }




}
