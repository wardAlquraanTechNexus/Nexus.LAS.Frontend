import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { LawFirmBranch } from '../../../../models/law-firm-models/law-firm-branch/law-firm-branch';
import { LawFirmDTO } from '../../../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { GetLawFirmBranchQuery } from '../../../../models/law-firm-models/law-firm-branch/params/get-law-firm-branch-query';
import { LawFirmBranchDto } from '../../../../models/law-firm-models/law-firm-branch/dtos/law-firm-branch-dto';
import { LawFirmBranchService } from '../../../../services/law-firm-services/law-firm-branch-service';
import { LawFirmBranchDialogFormComponent } from './law-firm-branch-dialog-form-component/law-firm-branch-dialog-form-component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LawFirmPersonDto } from '../../../../models/law-firm-models/law-firm-person/dtos/law-firm-person-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';

@Component({
  selector: 'app-law-firm-branches',
  standalone: false,
  templateUrl: './law-firm-branches-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class LawFirmBranchesComponent extends TableFormComponent<LawFirmBranch> {

  @Input() lawFirm!: LawFirmDTO;
  override params: GetLawFirmBranchQuery = {
    page: 0,
    pageSize: 10,
    lawFirmId: 0
  };
  override data: PaginateRsult<LawFirmBranchDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: LawFirmBranchService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog,
    private menuService: MenuService,
    override langService: LanguageService,
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit(): void {
    this.params.lawFirmId = this.lawFirm.id;
    super.ngOnInit();


  }

  override setDisplayColumns() {
    this.displayColumns = [
      {
        key: "branchName",
        label: this.label.LAW_FIRM.BRANCH_NAME,
        keysPipes: [
          { 
            key: 'branchName' 
          },
          {
            key: 'branchPrimary',
            pipes: ['primary']
          }
        ]
        
      },
      {
        key: "countryId",
        label: this.label.COMMON.COUNTRY,
        pipes: ['country']
      },
      {
        key: "city",
        label: this.label.COMMON.CITY,
        pipes: ['dl-by-comparekey'],
        compareKey: 'countryId'
      },
      {
        key: "phone1",
        label: this.label.COMMON.PHONE_1
      },
      {
        key: "phone2",
        label: this.label.COMMON.PHONE_2
      },
      {
        key: "phone3",
        label: this.label.COMMON.PHONE_3
      },
      {
        key: "fax",
        label: this.label.COMMON.FAX
      },
      {
        key: "email1",
        label: this.label.COMMON.EMAIL_1
      },
      {
        key: "email2",
        label: this.label.COMMON.EMAIL_2
      },
      {
        key: "action",
        label: this.label.COMMON.ACTIONS
      }
    ];
  }
  override fetchData() {
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
          this.loadingService.stopLoading('Loading data');
          this.errorHandler.handleApiError(err, 'Failed to load data');
          this.cdr.markForCheck();
        })
      })
  }

  showTable = true;
  toggleTable() {
    this.showTable = !this.showTable;
  }


  onAddNew() {
    let element: LawFirmBranchDto = {
      id: 0,
      lawFirmId: this.lawFirm.id,
      branchName: '',
      countryId: null,
      city: null,
      phone1: '',
      phone2: '',
      phone3: '',
      fax: '',
      email1: '',
      email2: '',
      branchPrimary: false
    };
    const dialogRef = this.dialog.open(LawFirmBranchDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(element: LawFirmPersonDto) {

    const dialogRef = this.dialog.open(LawFirmBranchDialogFormComponent, {
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



}
