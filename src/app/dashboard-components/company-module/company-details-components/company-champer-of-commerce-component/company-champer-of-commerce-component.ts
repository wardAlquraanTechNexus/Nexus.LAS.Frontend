import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { CompanyChamberOfCommerce } from '../../../../models/company-models/company-champer-of-commerce/company-champer-of-commerce';
import { BaseParam } from '../../../../models/base/base-param';
import { GetCompanyChamperOfCommerceParams } from '../../../../models/company-models/company-champer-of-commerce/params/get-company-champer-of-commerce-command';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { CompanyChamperOfCommerceService } from '../../../../services/company-services/company-champer-of-commerce-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { CompanyChamberOfCommerceDTO } from '../../../../models/company-models/company-champer-of-commerce/dtos/company-champer-of-commerce-dto';
import { CompanyChamperOfCommerceFormDialogComponent } from './company-champer-of-commerce-form-dialog-component/company-champer-of-commerce-form-dialog-component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company-champer-of-commerce-component',
  standalone: false,
  templateUrl: './company-champer-of-commerce-component.html',
  styleUrl: './company-champer-of-commerce-component.scss'
})
export class CompanyChamperOfCommerceComponent extends TableFormComponent<CompanyChamberOfCommerce> {

  override displayColumns: DisplayColumn[] = [
    {
      key: "cciNumber",
      label: "CCI Number"
    },
    {
      key: "cciIssueDate",
      label: "CCI Issue Date",
      pipes: ["date"]
    },
    {
      key: "cciExpiryDate",
      label: "CCI Expiry Date",
      pipes: ["date"]
    },
    {
      key: "cciExpiryActiveReminder",
      label: "Reminder",
      inputType: "mat-slide-toggle"
    },
    {
      key: "cciUsername",
      label: "Username"
    },
    {
      key: "cciPassword",
      label: "Password"
    },
    {
      key:"action",
      label:"Actions"
    }
  ]

  override params: GetCompanyChamperOfCommerceParams = {
    page: 0,
    pageSize: 10
  };
  @Input() company!: GetCompanyDto;

  constructor(
    override service: CompanyChamperOfCommerceService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog:MatDialog
  ) {
    super(service, cdr, fb, router, errorHandler, route)
  }
  override ngOnInit(): void {
    this.params.companyIdn = this.company.id;
    super.ngOnInit();
  }

 onAddNew() {
     let element: CompanyChamberOfCommerceDTO = {
       id: 0,
       companyIdn: this.company.id,
       cciNumber: "",
       cciIssueDate: "",
       cciExpiryDate: "",
       cciExpiryActiveReminder: false,
       cciUsername: "",
       cciPassword: ""
     };
     const dialogRef = this.dialog.open(CompanyChamperOfCommerceFormDialogComponent, {
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
     const dialogRef = this.dialog.open(CompanyChamperOfCommerceFormDialogComponent, {
       disableClose: true,
       data: row
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
 
 
    onRowClick(event: any) {
     if (event.key == 'cciExpiryActiveReminder') {
       this.showLoading = true;
       this.service.update(event.element).subscribe({
         next: (res => {
           this.errorHandler.showSuccess("Updated Successfully");
           this.showLoading = false;
           this.cdr.markForCheck();
         }), error: (err => {
           this.showLoading = false;
         })
       })
     }
   }
}
