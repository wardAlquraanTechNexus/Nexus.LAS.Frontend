import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LawFirm } from '../../../../models/law-firm-models/law-firm/law-firm';
import { CommonStatus } from '../../../../enums/common-status';
import { LawFirmDTO } from '../../../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { GetLawFirmQuery } from '../../../../models/law-firm-models/law-firm/params/get-law-firm-query';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LawFirmService } from '../../../../services/law-firm-services/law-firm-service';
import { LawFirmDialogFormComponent } from '../../law-firm-dialog-form-component/law-firm-dialog-form-component';
import { environment } from '../../../../../environment/environment';
import { downloadBlobFile } from '../../../_shared/shared-methods/downloadBlob';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { LawFirmExpertiseDto } from '../../../../models/law-firm-models/law-firm-expertise/dtos/law-firm-expertise-dto';
import { map, Observable } from 'rxjs';
import { LawFirmExpertiseService } from '../../../../services/law-firm-services/law-firm-expertise-service';
import { GetLawFirmExpertiseQuery } from '../../../../models/law-firm-models/law-firm-expertise/params/get-law-firm-expertise-query';

@Component({
  selector: 'app-base-law-firms-component',
  standalone: false,
  templateUrl: './base-law-firms-component.html',
  styleUrl: './base-law-firms-component.scss'
})
export class BaseLawFirmsComponent extends TableFormComponent<LawFirm> implements OnInit {

  loadLawFirmExpertiesesFn!: (search: string) => Observable<LawFirmExpertiseDto[]>;

  activeStatus = CommonStatus.Active;
  inactiveStatus = CommonStatus.Inactive;
  countryParentId!: number;

  formGroup!: FormGroup;

  statuses = [
    {
      value: CommonStatus.New, label: this.label.COMMON.NEW
    },
    {
      value: CommonStatus.Active, label: this.label.COMMON.ACTIVE
    },
    {
      value: CommonStatus.Inactive, label: this.label.COMMON.INACTIVE
    }
  ];


  selectedProperties: LawFirmDTO[] = [];
  override data: PaginateRsult<LawFirmDTO> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: GetLawFirmQuery = {
    page: 0,
    pageSize: 10,
    orderBy: 'id',
    orderDir: 'desc'
  }

  showFilters = false;

  constructor(
    override service: LawFirmService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    protected menuService: MenuService,
    protected dialog: MatDialog,
    protected dlService: DynamicListService,
    override langService: LanguageService,
    protected lawFirmExpertiseService: LawFirmExpertiseService,

  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.statuses = [
      {
        value: CommonStatus.New, label: this.label.COMMON.NEW
      },
      {
        value: CommonStatus.Active, label: this.label.COMMON.ACTIVE
      },
      {
        value: CommonStatus.Inactive, label: this.label.COMMON.INACTIVE
      }
    ];
    this.countryParentId = environment.rootDynamicLists.country;


    this.formGroup = this.fb.group(
      {
        countryId: [null],
        lawFirmExpertiseId: [null],
      },
    );

    this.loadLawFirmExpertiesesFn = (search: string) => this.loadLawFirmExpertises(search);



  }

  override fetchData(): void {
    this.showLoading = true;
    this.service.getPaging(this.params).subscribe({
      next: (res => {
        this.data = res;
        this.showLoading = false;
        this.cdr.markForCheck();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }

   loadLawFirmExpertises(search: string) {
    let expertiseName = search && search.trim() != '' ? search : null;
    let params: GetLawFirmExpertiseQuery = { page: 0, pageSize: 100 };
    if(expertiseName){
      params.expertiseName = expertiseName;
    }
    return this.lawFirmExpertiseService.getPaging(params).pipe(
      map(res => res.collection)
    );
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onAddNew() {
    const element: LawFirmDTO = {
      id: 0,
      lawFirmCode: '',
      englishName: '',
      arabicName: '',
      shortName: '',
      status: null,
      lasDate: null,
      estYear: null,
      website: null,
      private: false

    };
    const dialogRef = this.dialog.open(LawFirmDialogFormComponent, {
      disableClose: true,
      data: element,
      // width: '900px',
      // maxWidth: '95vw',
      // minWidth: '800px',
      panelClass: 'property-dialog-panel'
    });

    let path =
      this.menuService.getMenuByPath(environment.routes.AllLawFirms) ||
      this.menuService.getMenuByPath(environment.routes.ActiveLawFirms) ||
      this.menuService.getMenuByPath(environment.routes.ActivePrivateLawFirms) ||
      this.menuService.getMenuByPath(environment.routes.ActivePublicLawFirms);
    let basePath = this.menuService.getMenuByPath(environment.routes.LawFirms);


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { id: result.id },
        });
      }
    })
  }

  onEdit(row: any) {
    const element = { ...row };
    const dialogRef = this.dialog.open(LawFirmDialogFormComponent, {
      disableClose: true,
      data: element,
      width: '900px',
      maxWidth: '95vw',
      minWidth: '800px',
      panelClass: 'property-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })

  }

  onCountryChange($event: any) {
    this.params.countryId = $event;
    this.fetchData();
  }
   onLawFirmExpertiseChange($event: any) {
    this.params.expertiseId = $event;
    this.fetchData();
  }

  bulkChangeStatus(status: CommonStatus) {
    this.showLoading = true;
    this.service.updateStatus({
      ids: this.selectedProperties.map(x => x.id),
      status: status
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.selectedProperties = [];
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }
  bulkChangePrivate(isPrivate: boolean) {
    this.showLoading = true;
    this.service.updatePrivate({
      ids: this.selectedProperties.map(x => x.id),
      isPrivate: isPrivate
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.selectedProperties = [];

        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }



  activate(event: any) {
    this.changeStatus(event, CommonStatus.Active);
  }
  deactivate(event: any) {
    this.changeStatus(event, CommonStatus.Inactive);
  }
  markPublic(event: any) {
    this.changePrivate(event, false);
  }
  markPrivate(event: any) {
    this.changePrivate(event, true);

  }
  deleteCompany(event: any) {
    return () => this.deleteCompanyAfterConfirm(event);
  }

  deleteCompanyAfterConfirm(event: any) {
    this.showLoading = true;
    this.service.delete(event.id).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Deleted Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }


  changeStatus(event: any, status: CommonStatus) {
    this.showLoading = true;
    this.service.updateStatus({
      ids: [event.id],
      status: status
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }

  changePrivate(event: any, isPrivate: boolean) {
    this.showLoading = true;
    this.service.updatePrivate({
      ids: [event.id],
      isPrivate: isPrivate
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }

  onSelectionChange(selectedRows: LawFirmDTO[]) {
    this.selectedProperties = selectedRows;
    this.cdr.markForCheck();
  }


  getAuditTooltip(person: any): string {
    const createdBy = person?.createdBy || 'N/A';
    const createdAt = person?.createdAt ? new Date(person.createdAt).toLocaleDateString('en-GB') : 'N/A';
    const modifiedBy = person?.modifiedBy || 'N/A';
    const modifiedAt = person?.modifiedAt ? new Date(person.modifiedAt).toLocaleDateString('en-GB') : 'N/A';

    return `Created by: ${createdBy}\nCreated at: ${createdAt}\n\nModified by: ${modifiedBy}\nModified at: ${modifiedAt}`;
  }

  onRowClick(event: any) {
    if (event.key == "lawFirmCode") {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { id: event.element.id },
      });
    }
  }

  exportToExcel() {
    this.service.exportToExcel(this.params).subscribe(res => {
      // Assuming res.data is base64 string:
      const binaryString = atob(res.data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });


      downloadBlobFile(blob, res.fileName || 'export.xlsx');
    });
  }



}