import { ChangeDetectorRef, Component } from '@angular/core';
import { FPCService } from '../../../../services/fpc-services/fpc-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { LanguageService } from '../../../../services/language-service';
import { BaseFpcsComponent } from '../../_base/base-fpcs-component/base-fpcs-component';
import { DisplayColumn } from '../../../../models/columns/display-column';

@Component({
  selector: 'app-all-fpcs-table',
  standalone: false,
  templateUrl: './all-fpcs-table-component.html',
  styleUrl: './all-fpcs-table-component.scss'
})
export class AllFpcsTableComponent  extends BaseFpcsComponent {
  override displayColumns: DisplayColumn[] = [];

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
        key: "select",
        label: this.label.COMMON.SELECT
      },
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
        key: "fpcStatus", 
        label: this.label.COMMON.STATUS, 
        sort: true ,
        pipes: ['common-status'],
        hasIcon: true
      },
      { 
        key: "private", 
        label: this.label.COMMON.PRIVATE, 
        sort: true ,
        pipes: ['private'],
        hasIcon: true
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
