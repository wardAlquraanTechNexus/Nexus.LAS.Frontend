import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { LawFirmExpertise } from '../../../../models/law-firm-models/law-firm-expertise/law-firm-expertise';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { LawFirmDTO } from '../../../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { GetLawFirmExpertiseQuery } from '../../../../models/law-firm-models/law-firm-expertise/params/get-law-firm-expertise-query';
import { LawFirmExpertiseDto } from '../../../../models/law-firm-models/law-firm-expertise/dtos/law-firm-expertise-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { LawFirmExpertiseDialogFormComponent } from './law-firm-expertise-dialog-form-component/law-firm-expertise-dialog-form-component';
import { LawFirmExpertiseService } from '../../../../services/law-firm-services/law-firm-expertise-service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../../environment/environment.prod';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';

@Component({
  selector: 'app-law-firm-expertises',
  standalone: false,
  templateUrl: './law-firm-expertises-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class LawFirmExpertisesComponent  extends TableFormComponent<LawFirmExpertise> {

  @Input() lawFirm!: LawFirmDTO;
  override params: GetLawFirmExpertiseQuery = {
    page: 0,
    pageSize: 10,
    lawFirmId: 0
  };
  override data: PaginateRsult<LawFirmExpertiseDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: LawFirmExpertiseService,
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
        key: "expertiseName",
        label: this.label.COMMON.NAME
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
    let element: LawFirmExpertiseDto = {
      id: 0,
      lawFirmId: this.lawFirm.id,
      expertiseName: null
    };
    const dialogRef = this.dialog.open(LawFirmExpertiseDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(element: LawFirmExpertiseDto) {

    const dialogRef = this.dialog.open(LawFirmExpertiseDialogFormComponent, {
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
