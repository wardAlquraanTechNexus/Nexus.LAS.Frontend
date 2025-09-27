import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { LawFirmPerson } from '../../../../models/law-firm-models/law-firm-person/law-firm-person';
import { LawFirmPersonDto } from '../../../../models/law-firm-models/law-firm-person/dtos/law-firm-person-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { GetLawFirmPersonQuery } from '../../../../models/law-firm-models/law-firm-person/params/get-law-firm-person-query';
import { LawFirmDTO } from '../../../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { LawFirmPersonService } from '../../../../services/law-firm-services/law-firm-person-service';
import { LawFirmPersonDialogFormComponent } from './law-firm-person-dialog-form-component/law-firm-person-dialog-form-component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { environment } from '../../../../../environment/environment.prod';

@Component({
  selector: 'app-law-firm-persons',
  standalone: false,
  templateUrl: './law-firm-persons-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class LawFirmPersonsComponent extends TableFormComponent<LawFirmPerson> {

  countryParentId: number = 0;
  @Input() lawFirm!: LawFirmDTO;
  override params: GetLawFirmPersonQuery = {
    page: 0,
    pageSize: 10,
    lawFirmId: 0
  };
  override data: PaginateRsult<LawFirmPersonDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: LawFirmPersonService,
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
    this.countryParentId = environment.rootDynamicLists.country;


  }

  override setDisplayColumns() {
    this.displayColumns = [

      {
        key: "name",
        label: this.label.COMMON.NAME
      },
      {
        key: "email",
        label: this.label.COMMON.EMAIL
      },
      {
        key: "phone",
        label: this.label.COMMON.PHONE_NUMBER
      },
      {
        key: "staffLevel",
        label: this.label.LAW_FIRM.STAFF_LEVEL,
        pipes: ['staff-level']
      },
      {
        key: "staffStatus",
        label: this.label.COMMON.ACTIVE,
        pipes: ['active']
      },
      {
        key: "practice",
        label: this.label.LAW_FIRM.PRACTICE
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
    let element: LawFirmPersonDto = {
      id: 0,
      lawFirmId: this.lawFirm.id,
      staffLevel: undefined,
      name: '',
      practice: '',
      email: '',
      phone: '',
      staffStatus: false,
    };
    const dialogRef = this.dialog.open(LawFirmPersonDialogFormComponent, {
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

    const dialogRef = this.dialog.open(LawFirmPersonDialogFormComponent, {
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
