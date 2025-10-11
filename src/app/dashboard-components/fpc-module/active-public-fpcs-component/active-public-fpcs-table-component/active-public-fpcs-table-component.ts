import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { FPCService } from '../../../../services/fpc-services/fpc-service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { BaseFpcsComponent } from '../../_base/base-fpcs-component/base-fpcs-component';
import { GetFPCParam } from '../../../../models/fpc-models/fpc/params/get-fpc-param';
import { CommonStatus } from '../../../../enums/common-status';

@Component({
  selector: 'app-active-public-fpcs-table',
  standalone:false,
  templateUrl: './active-public-fpcs-table-component.html',
  styleUrl: './active-public-fpcs-table-component.scss'
})
export class ActivePublicFpcsTableComponent extends BaseFpcsComponent {
  override displayColumns: DisplayColumn[] = [];

  override params: GetFPCParam = {
    statuses : [CommonStatus.Active],
    privates: [false],
    page:0,
    pageSize: 10
  }

  constructor(
    override service: FPCService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    override menuService: MenuService,
    override dialog: MatDialog,
    override dlService: DynamicListService,
    override langService: LanguageService
  ) {
    super(service, cdr, fb, router, errorHandler, route, menuService, dialog, dlService, langService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override setDisplayColumns() {
     this.displayColumns = [
      {
        key: "fpcCode",
        label: this.label.COMMON.CODE,
        pipes: ["link"],
        sort: true
      },
      {
        key: 'registerIdn',
        label: this.label.COMMON.NAME,
        sort: true,
        pipes: ['register', 'link'],
        compareKey: 'registerIdc',
      },
      { 
        key: 'registerIdc',
        label: this.label.TRANSACTION.REGISTER_TYPE,
        sort: true,
        pipes: ['register-type', 'link']
      },
      {
        key: 'action',
        label: this.label.COMMON.ACTIONS,
      }
    ];
  }

  updateColumnLabels() {
    this.setDisplayColumns();
  }
}
